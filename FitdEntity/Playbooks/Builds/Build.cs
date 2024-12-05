namespace FitdEntity.Playbooks.Builds
{
	public class Build<TAction> : BaseDataPart where TAction : Enum
	{
		public IDictionary<TAction, int> BonusActions { get; set; } = new Dictionary<TAction, int>();
		public Guid StartingSpecialAbilityid { get; set; }
	}
}
