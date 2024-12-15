using FitdConfig;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Mappers;
using FitdEntity.Playbooks;
using FitdGateway.RefGateway;

namespace FitdEntityControls.Repo
{
	public static class RepoFactory
	{
		public static IRepo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef> CreateNewRepo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef>(
			IRefGateway pGateway, GameTypes pGameType, IPlaybookMapper<TCharPlaybook, TCharPlaybookRef> pCharMapper, IPlaybookMapper<TCrewPlaybook, TCrewPlaybookRef> pCrewMapper) 
			where TCharPlaybook : BaseCharPlaybook 
			where TCrewPlaybook : BaseCrewPlaybook
			where TCharPlaybookRef : BaseCharPlaybookRef
			where TCrewPlaybookRef : BaseCrewPlaybookRef
		{
			return new Repo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef>(pGateway, pGameType, pCharMapper, pCrewMapper);
		}
	}
}
