using FitdConfig;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Mappers;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.SpecialAbilities;
using FitdEntityControls.Repo.MasterList;
using FitdGateway.RefGateway;

namespace FitdEntityControls.Repo
{
	public sealed class Repo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef>(IRefGateway pGateway, GameTypes pGameType, 
		IPlaybookMapper<TCharPlaybook, TCharPlaybookRef> pCharMapper, IPlaybookMapper<TCrewPlaybook, TCrewPlaybookRef> pCrewMapper) 
		: IRepo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef> 
		where TCharPlaybook : BaseCharPlaybook 
		where TCrewPlaybook : BaseCrewPlaybook 
		where TCharPlaybookRef : BaseCharPlaybookRef 
		where TCrewPlaybookRef : BaseCrewPlaybookRef
	{
		private readonly IRefGateway _gateway = pGateway;
		private readonly GameTypes _gameType = pGameType;
		private readonly IPlaybookMapper<TCharPlaybook, TCharPlaybookRef> _charMapper = pCharMapper;
		private readonly IPlaybookMapper<TCrewPlaybook, TCrewPlaybookRef> _crewMapper = pCrewMapper;

		#region "IRepo"
		private MasterList<PlaybookSpecialAbility>? _charSpecialAbilities = null;
		public IMasterList<PlaybookSpecialAbility> CharSpecialAbilities {
			get
			{
				if (_charSpecialAbilities is null)
				{
					ICollection<PlaybookSpecialAbility> data = _gateway.GetAll<PlaybookSpecialAbility>(_gameType, EntityTypes.CharSpecialAbility) ?? [];
					_charSpecialAbilities = new(data);
				}

				return _charSpecialAbilities;
			}
		}

		private MasterList<PlaybookSpecialAbility>? _crewSpecialAbilities = null;
		public IMasterList<PlaybookSpecialAbility> CrewSpecialAbilities {
			get
			{
				if (_crewSpecialAbilities is null)
				{
					ICollection<PlaybookSpecialAbility> data = _gateway.GetAll<PlaybookSpecialAbility>(_gameType, EntityTypes.CrewSpecialAbility) ?? [];
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
					ICollection<TCharPlaybookRef> dataRefs = _gateway.GetAll<TCharPlaybookRef>(_gameType, EntityTypes.CharPlaybook) ?? [];
					ICollection<TCharPlaybook> data = _charMapper.MapPlaybooksFromRef(dataRefs);
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
					ICollection<TCrewPlaybookRef> dataRefs = _gateway.GetAll<TCrewPlaybookRef>(_gameType, EntityTypes.CharPlaybook) ?? [];
					ICollection<TCrewPlaybook> data = _crewMapper.MapPlaybooksFromRef(dataRefs);
					_crewPlaybooks = new(data);
				}

				return _crewPlaybooks;
			}
		}
		#endregion
	}
}
