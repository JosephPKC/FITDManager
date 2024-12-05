using FitdEntity.Sheets.Conditions;

namespace FitdEntity.Sheets.Harm
{
	public class HarmSet
	{
		public ConditionList MinorHarm { get; set; } = new();
		public ConditionList ModerateHarm { get; set; } = new();
		public ConditionList MajorHarm { get; set; } = new();

		public HarmSet() { }
		public HarmSet(int pMinorMax = 0, int pModerateMax = 0, int pMajorMax = 0)
		{
			MinorHarm = new(pMinorMax);
			ModerateHarm = new(pModerateMax);
			MajorHarm = new(pMajorMax);
		}
	}
}
