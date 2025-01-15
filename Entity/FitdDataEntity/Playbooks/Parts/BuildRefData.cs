namespace FitdDataEntity.Playbooks.Parts
{
	public class BuildRefData : BaseRefData
	{
		public IDictionary<string, int> BonusActions { get; init; } = new Dictionary<string, int>();
		public int StartingSpecialAbilityId { get; init; }
	}
}
