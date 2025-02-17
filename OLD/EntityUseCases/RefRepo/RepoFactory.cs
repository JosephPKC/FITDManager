using DataGateway.RefGateway;
using EntityMapper;
using EntityMapper.Bitd;
using FitdConfig;
using FitdCoreEntity.Playbooks;
using FitdDataEntity.Playbooks;

namespace RefRepo
{
	public static class RepoFactory
	{
		public static IRepo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity> CreateNewRepo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity>
			(IRefGateway pGateway, GameTypes pGameType, IMapper<TCharPlaybookData, TCharPlaybookEntity> pCharMapper, IMapper<TCrewPlaybookData, TCrewPlaybookEntity> pCrewMapper)
			where TCharPlaybookData : BaseCharPlaybookData
			where TCrewPlaybookData : BaseCrewPlaybookData
			where TCharPlaybookEntity : BaseCharPlaybookEntity
			where TCrewPlaybookEntity : BaseCrewPlaybookEntity
		{
			return new Repo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity>(pGateway, pGameType, pCharMapper, pCrewMapper);
		}

		public static IBitdRepo CreateNewBitdRepo(IRefGateway pGateway, IBitdCharPlaybookMapper pCharMapper, IBitdCrewPlaybookMapper pCrewMapper)
		{
			return new BitdRepo(pGateway, pCharMapper, pCrewMapper);
		}
	}
}
