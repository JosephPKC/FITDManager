namespace FitdEntity.Sheets.Conditions
{
	public class ConditionList
	{
		public ICollection<string> Conditions { get; set; } = [];
		public int MaxConditions { get; set; } = 0;

		public ConditionList() { }

		public ConditionList(int pMaxCondition = 0)
		{
			MaxConditions = pMaxCondition;
		}
	}
}
