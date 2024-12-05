using FitdDataIO.Repo.MasterList;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.SpecialAbilities;

namespace FitdDataIO.Repo
{
	public interface IRepo<TCharPlaybook, TCrewPlaybook> where TCharPlaybook : BaseCharPlaybook where TCrewPlaybook : BaseCrewPlaybook
	{
		IMasterList<SpecialAbility> CharSpecialAbilities { get; }
		IMasterList<SpecialAbility> CrewSpecialAbilities { get; }
		IMasterList<TCharPlaybook> CharPlaybooks { get; }
		IMasterList<TCrewPlaybook> CrewPlaybooks { get; }
	}
}
