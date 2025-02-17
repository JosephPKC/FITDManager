using FitdEntity.Bitd;
using FitdEntity.Bitd.Playbooks;
using FitdEntity.Bitd.Sheets;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.Builds;
using FitdEntity.Playbooks.SpecialAbilities;
using FitdEntity.Sheets.SpecialAbilities;
using FitdEntityControls.Repo;
using FitdEntityControls.SheetCreator;
using FitdGateway;
using System.Linq;
using Utils.Exceptions;

namespace FitdCreator.Creators.Bitd
{
    internal class BitdCharCreator
    {
        // Choose Playbook
        // Choose Build (optional)
        // Set Background
        // Set Heritage
        // Choose Special Ability
        // Distribute Action Dots
        // Set Ally Contact
        // Set Rival Contact
        // Set Vice
        // Set Purveyor
        // Set Name
        // Set Alias
        // Set Look
        // Set Crew Name
        // Finish (Set Defaults and other stuff from Playbook)

        protected BitdCharSheet _sheet;
        protected readonly IBitdRepo _repo;

        protected BitdCharPlaybook? _playbook = null;
		protected PlaybookBuild<BitdActions.Actions>? _build = null;

        protected Dictionary<int, SpecialAbility> _sheetSpecialAbilities = [];

		public BitdCharCreator(IBitdRepo pRepo)
        {
            ISheetCreator<BitdCharSheet> creator = SheetCreatorFactory.CreateNewCharSheetCreator<BitdCharSheet>(FitdConfig.GameTypes.BitD);
            _sheet = creator.CreateSheet();

            _repo = pRepo;
        }

        public void Reset()
        {
			ISheetCreator<BitdCharSheet> creator = SheetCreatorFactory.CreateNewCharSheetCreator<BitdCharSheet>(FitdConfig.GameTypes.BitD);
            _sheet = creator.CreateSheet();

            _playbook = null;
            _build = null;
            _sheetSpecialAbilities.Clear();
        }

        public void ChoosePlaybook(int pPlaybookId)
        {
            ArgumentExceptionExt.ThrowIfNegative("PlaybookId", pPlaybookId);

            if (!_repo.CharPlaybooks.Contains(pPlaybookId))
            {
                throw new ArgumentException($"Playbook id {pPlaybookId} does not exist.");
            }

            BitdCharPlaybook? playbook = _repo.CharPlaybooks.GetById(pPlaybookId);
            ArgumentNullException.ThrowIfNull(playbook, "Playbook id");

            _playbook = playbook;
            _sheet.PlaybookId = pPlaybookId;
        }

        public void SetPlaybookDefaults()
        {
			ArgumentNullException.ThrowIfNull(_playbook, "Playbook");


            _sheet.AvailableSpecialAbilities = GetAvailableSpecialAbilities(_playbook.SpecialAbilities);
            
		}

        private IDictionary<Guid, SpecialAbility> GetAvailableSpecialAbilities(IReadOnlyDictionary<int, PlaybookSpecialAbility> pSpecialAbilities)
        {
			// Veteran should be included in the playbooks already.
			Dictionary<Guid, SpecialAbility> sheetSpecialAbilities = [];

			foreach (PlaybookSpecialAbility pSpecialAbility in pSpecialAbilities.Values)
			{
				SpecialAbility sheetSpecialAbility = GetSheetSpecialAbility(pSpecialAbility);
				sheetSpecialAbilities.Add(sheetSpecialAbility.Id, sheetSpecialAbility);
                // Store into cache too
                _sheetSpecialAbilities.Add(pSpecialAbility.Id, sheetSpecialAbility);
			}

			return sheetSpecialAbilities;
		}
		// Needs to be a mapper
		private SpecialAbility GetSheetSpecialAbility(PlaybookSpecialAbility pSpecialAbility)
        {
            return new() {
                Id = Guid.NewGuid(),
                RefId = pSpecialAbility.Id,
                IsCustom = false,
                IsFromVeteran = false,
                Name = pSpecialAbility.Name,
				Text = pSpecialAbility.Text,
				NbrOfBoxes = pSpecialAbility.NbrOfBoxes
            };
        }

        public void ChooseStartingBuild(int pBuildId)
        {
            ArgumentNullException.ThrowIfNull(_playbook, "Playbook");
			ArgumentExceptionExt.ThrowIfNegative("BuildId", pBuildId);

			if (!_playbook.StartingBuilds.ContainsKey(pBuildId))
			{
				throw new ArgumentException($"Build id {pBuildId} does not exist.");
			}

            PlaybookBuild<BitdActions.Actions> build = _playbook.StartingBuilds[pBuildId];

			_build = build;
		}

        public void SetBuildDefaults()
        {
			ArgumentNullException.ThrowIfNull(_playbook, "Playbook");
			ArgumentNullException.ThrowIfNull(_build, "Build");

            _sheet.LearnedSpecialAbilities.Add
		}

        public void SetBackground(string pBackground)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(pBackground, "Background");

            _sheet.Background = pBackground;
        }

		public void SetHeritage(string pHeritage)
		{
			ArgumentException.ThrowIfNullOrWhiteSpace(pHeritage, "Heritage");

			_sheet.Heritage = pHeritage;
		}

        public void ChooseSpecialAbility(int pSpecialAbilityId)
        {
			ArgumentNullException.ThrowIfNull(_playbook, "Playbook");
			ArgumentExceptionExt.ThrowIfNegative("SpecialAbilityId", pSpecialAbilityId);

            if (!_playbook.SpecialAbilities.ContainsKey(pSpecialAbilityId))
            {
				throw new ArgumentException($"Special ability id {pSpecialAbilityId} does not exist.");
			}

			if (!_sheetSpecialAbilities.TryGetValue(pSpecialAbilityId, out SpecialAbility? sheetValue))
			{
				throw new ArgumentException($"Special ability id {pSpecialAbilityId} does not exist.");
			}

			Guid sheetSpecialAbilityId = sheetValue.Id;
            if (!_sheet.LearnedSpecialAbilities.TryGetValue(sheetSpecialAbilityId, out int value))
            {
                _sheet.LearnedSpecialAbilities.Add(sheetSpecialAbilityId, 1);
            }
            else
            {
                PlaybookSpecialAbility specialAbility = _playbook.SpecialAbilities[pSpecialAbilityId];
                int rank = value;
                // rank is nbr of times it was learned. It cannot exceed NbrOfBoxes.
                if (specialAbility.NbrOfBoxes < rank)
                {
                    _sheet.LearnedSpecialAbilities[sheetSpecialAbilityId] = ++value;
                    if (specialAbility.NbrOfBoxes - 1 == rank)
                    {
                        // Remove it from available list
                        _sheet.AvailableSpecialAbilities.Remove(sheetSpecialAbilityId);
                    }
                }
                else
                {
                    throw new Exception($"Special ability id {pSpecialAbilityId} has already been learned.");
                }
            }
		}
	}
}
