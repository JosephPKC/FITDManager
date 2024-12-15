namespace FitdEntity.Playbooks.Builds
{
	public class PlaybookBuild<TAction> : BasePlaybookPart where TAction : Enum
	{
		public IReadOnlyDictionary<TAction, int> BonusActions { get; init; } = new Dictionary<TAction, int>();
		public int StartingSpecialAbilityId { get; init; }
	}
}
