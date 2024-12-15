using FitdEntity.DataStructs;

namespace FitdEntity.Sheets.Harm
{
    public class HarmSet
	{
		public LimitedCol<string> MinorHarm { get; set; } = new();
		public LimitedCol<string> ModerateHarm { get; set; } = new();
		public LimitedCol<string> MajorHarm { get; set; } = new();

		public HarmSet() { }

		public HarmSet(int pMinorMax = 0, int pModerateMax = 0, int pMajorMax = 0)
		{
			MinorHarm = new(pMinorMax);
			ModerateHarm = new(pModerateMax);
			MajorHarm = new(pMajorMax);
		}
	}
}
