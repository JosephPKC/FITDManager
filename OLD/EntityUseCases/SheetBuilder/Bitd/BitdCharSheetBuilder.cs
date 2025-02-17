using EntityMapper.Common;
using FitdConfig;
using FitdCoreEntity.Bitd;
using FitdCoreEntity.Playbooks.Parts;
using FitdCoreEntity.Sheets.Parts;
using FitdDataEntity.Playbooks.Parts;
using RefRepo;
using SheetManager;
using System.Collections.Generic;

namespace SheetBuilder.Bitd
{
	internal class BitdCharSheetBuilder(IBitdRepo pRepo, ISheetSaver<BitdCharSheetEntity> pSaver) : ISheetBuilder
	{
		protected readonly IBitdRepo _repo = pRepo;
		protected readonly ISheetSaver<BitdCharSheetEntity> _saver = pSaver;

		protected BitdCharSheetEntity? _sheet = null;
		protected BitdCharPlaybookEntity? _playbook = null;

		#region "ISheetBuilder"
		public void CreateBlankSheet()
		{
			_sheet = new()
			{
				Id = Guid.NewGuid()
			};
		}

		public void Reset()
		{
			_sheet = null;
			_playbook = null;
		}

		public void SaveSheet()
		{
			if (_sheet is null)
			{
				return;
			}
			_saver.Save(GameTypes.BitD, EntityTypes.CharSheet, _sheet);
		}
		#endregion

		public void SelectPlaybook(int pPlaybookId)
		{
			if (_sheet is null)
			{
				throw new Exception("Sheet is not yet created.");
			}
			_playbook = _repo.CharPlaybooks.GetById(pPlaybookId);
			if (_playbook is null )
			{
				throw new Exception($"{pPlaybookId} does not exist.");
			}

			_sheet.PlaybookRefId = pPlaybookId;
			// Load playbook stuff
			foreach (SpecialAbilityRefEntity refEntity in _playbook.SpecialAbilities.Values)
			{
				SpecialAbilityEntity entity = SpecialAbilityMapper.MapNonRefEntityFromRef(refEntity, Guid.NewGuid(), false, false);
				_sheet.SpecialAbilities.Add(entity);
			}
		}

		public void SelectStartingBuild(int pBuildId)
		{
			if (_sheet is null)
			{
				throw new Exception("Sheet is not yet created.");
			}
			if (_playbook is null)
			{
				throw new Exception("Playbook is not yet selected.");
			}

			if (!_playbook.StartingBuilds.ContainsKey(pBuildId))
			{
				throw new Exception($"{pBuildId} does not exist.");
			}
			BuildRefEntity<BitdActions.Actions> build = _playbook.StartingBuilds[pBuildId];
			// Set build defaults
			_sheet.LearnedSpecialAbilities.Add()
		}
	}
}
