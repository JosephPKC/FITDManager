using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.SpecialAbilities;
using FitdEntityControls.Repo.MasterList;

namespace FitdEntityControls.Repo
{
	public interface IRepo<TCharPlaybook, TCrewPlaybook, TCharPlaybookRef, TCrewPlaybookRef> where TCharPlaybook : BaseCharPlaybook where TCrewPlaybook : BaseCrewPlaybook where TCharPlaybookRef : BaseCharPlaybookRef where TCrewPlaybookRef : BaseCrewPlaybookRef
	{
		IMasterList<PlaybookSpecialAbility> CharSpecialAbilities { get; }
		IMasterList<PlaybookSpecialAbility> CrewSpecialAbilities { get; }
		IMasterList<TCharPlaybook> CharPlaybooks { get; }
		IMasterList<TCrewPlaybook> CrewPlaybooks { get; }
	}
}
