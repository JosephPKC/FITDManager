namespace FitdCoreEntity.Playbooks.Parts
{
	public class BuildRefEntity<TAction> : BaseRefEntity where TAction : Enum
	{
		public IDictionary<TAction, int> BonusActions { get; init; } = new Dictionary<TAction, int>();
		public int StartingSpecialAbilityId { get; init; }
	}
}
