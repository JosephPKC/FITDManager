using DataGateway.RefGateway;
using EntityMapper;
using EntityMapper.Common;
using FitdConfig;
using FitdCoreEntity.Playbooks;
using FitdCoreEntity.Playbooks.Parts;
using FitdDataEntity.Playbooks;
using FitdDataEntity.Playbooks.Parts;
using RefRepo.MasterList;

namespace RefRepo
{
	public class Repo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity>(IRefGateway pGateway, GameTypes pGameType,
		IMapper<TCharPlaybookData, TCharPlaybookEntity> pCharMapper, IMapper<TCrewPlaybookData, TCrewPlaybookEntity> pCrewMapper)
		: IRepo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity>
		where TCharPlaybookData : BaseCharPlaybookData
		where TCrewPlaybookData : BaseCrewPlaybookData
		where TCharPlaybookEntity : BaseCharPlaybookEntity
		where TCrewPlaybookEntity : BaseCrewPlaybookEntity
	{
		private readonly IRefGateway _gateway = pGateway;
		private readonly GameTypes _gameType = pGameType;

		private readonly IMapper<TCharPlaybookData, TCharPlaybookEntity> _charMapper = pCharMapper;
		private readonly IMapper<TCrewPlaybookData, TCrewPlaybookEntity> _crewMapper = pCrewMapper;

		#region "IRepo"
		private MasterList<SpecialAbilityRefEntity>? _charSpecialAbilities = null;
		public IMasterList<SpecialAbilityRefEntity> CharSpecialAbilities {
			get
			{
				if (_charSpecialAbilities is null)
				{
					ICollection<SpecialAbilityRefData> data = _gateway.GetAll<SpecialAbilityRefData>(_gameType, EntityTypes.CharSpecialAbility) ?? [];
					ICollection<SpecialAbilityRefEntity> entities = (ICollection<SpecialAbilityRefEntity>)data.Select(x => SpecialAbilityMapper.MapRefEntityFromData(x));
					_charSpecialAbilities = new(entities);
				}

				return _charSpecialAbilities;
			}
		}

		private MasterList<SpecialAbilityRefEntity>? _crewSpecialAbilities = null;
		public IMasterList<SpecialAbilityRefEntity> CrewSpecialAbilities {
			get
			{
				if (_crewSpecialAbilities is null)
				{
					ICollection<SpecialAbilityRefData> data = _gateway.GetAll<SpecialAbilityRefData>(_gameType, EntityTypes.CrewSpecialAbility) ?? [];
					ICollection<SpecialAbilityRefEntity> entities = (ICollection<SpecialAbilityRefEntity>)data.Select(x => SpecialAbilityMapper.MapRefEntityFromData(x));
					_crewSpecialAbilities = new(entities);
				}

				return _crewSpecialAbilities;
			}
		}

		private MasterList<TCharPlaybookEntity>? _charPlaybooks = null;
		public IMasterList<TCharPlaybookEntity> CharPlaybooks {
			get
			{
				if (_charPlaybooks is null)
				{
					ICollection<TCharPlaybookData> data = _gateway.GetAll<TCharPlaybookData>(_gameType, EntityTypes.CharPlaybook) ?? [];
					ICollection<TCharPlaybookEntity> entities = (ICollection<TCharPlaybookEntity>)data.Select(x => _charMapper.MapEntityFromData(x));
					_charPlaybooks = new(entities);
				}

				return _charPlaybooks;
			}
		}

		private MasterList<TCrewPlaybookEntity>? _crewPlaybooks = null;
		public IMasterList<TCrewPlaybookEntity> CrewPlaybooks {
			get
			{
				if (_crewPlaybooks is null)
				{
					ICollection<TCrewPlaybookData> data = _gateway.GetAll<TCrewPlaybookData>(_gameType, EntityTypes.CharPlaybook) ?? [];
					ICollection<TCrewPlaybookEntity> entities = (ICollection<TCrewPlaybookEntity>)data.Select(x => _crewMapper.MapEntityFromData(x));
					_crewPlaybooks = new(entities);
				}

				return _crewPlaybooks;
			}
		}
		#endregion
	}
}
