using FitdConfig;
using FitdDataIO.Repo.MasterList;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.SpecialAbilities;
using FitdGateway.RefGateway;

namespace FitdDataIO.Repo
{
	public sealed class Repo<TCharPlaybook, TCrewPlaybook>(IRefGateway pGateway, GameTypes pGameType) : IRepo<TCharPlaybook, TCrewPlaybook> where TCharPlaybook : BaseCharPlaybook where TCrewPlaybook : BaseCrewPlaybook
	{
		private readonly IRefGateway _gateway = pGateway;
		private readonly GameTypes _gameType = pGameType;

		#region "IRepo"
		private MasterList<SpecialAbility>? _charSpecialAbilities = null;
		public IMasterList<SpecialAbility> CharSpecialAbilities {
			get
			{
				if (_charSpecialAbilities is null)
				{
					ICollection<SpecialAbility> data = _gateway.GetAll<SpecialAbility>(new ColType(EntityTypes.CharSpecialAbility, _gameType)) ?? [];
					_charSpecialAbilities = new(data);
				}

				return _charSpecialAbilities;
			}
		}

		private MasterList<SpecialAbility>? _crewSpecialAbilities = null;
		public IMasterList<SpecialAbility> CrewSpecialAbilities {
			get
			{
				if (_crewSpecialAbilities is null)
				{
					ICollection<SpecialAbility> data = _gateway.GetAll<SpecialAbility>(new ColType(EntityTypes.CrewSpecialAbility, _gameType)) ?? [];
					_crewSpecialAbilities = new(data);
				}

				return _crewSpecialAbilities;
			}
		}

		private MasterList<TCharPlaybook>? _charPlaybooks = null;
		public IMasterList<TCharPlaybook> CharPlaybooks {
			get
			{
				if (_charPlaybooks is null)
				{
					ICollection<TCharPlaybook> data = _gateway.GetAll<TCharPlaybook>(new ColType(EntityTypes.CharPlaybook, _gameType)) ?? [];
					_charPlaybooks = new(data);
				}

				return _charPlaybooks;
			}
		}

		private MasterList<TCrewPlaybook>? _crewPlaybooks = null;
		public IMasterList<TCrewPlaybook> CrewPlaybooks {
			get
			{
				if (_crewPlaybooks is null)
				{
					ICollection<TCrewPlaybook> data = _gateway.GetAll<TCrewPlaybook>(new ColType(EntityTypes.CharPlaybook, _gameType)) ?? [];
					_crewPlaybooks = new(data);
				}

				return _crewPlaybooks;
			}
		}
		#endregion
	}
}
