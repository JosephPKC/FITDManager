using FitdEntity.Playbooks;

namespace FitdEntity.DbRefs.Playbooks.Builds
{
	public class PlaybookBuildRef<TAction> : BasePlaybookPart where TAction : Enum
	{
		public IDictionary<TAction, int> BonusActions { get; init; } = new Dictionary<TAction, int>();
		public int StartingSpecialAbilityId { get; init; }
	}
}
