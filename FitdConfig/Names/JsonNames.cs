namespace FitdConfig.Names
{
	public static class JsonNames
	{
		public static string PlaybookJsonPath { get; } = "Playbooks/";

		public static Dictionary<GameType.GameTypes, string> CharPlaybookNames { get; } = new()
		{
			{ GameType.GameTypes.BitD, "BITD_Char_Playbooks.json" },
			{ GameType.GameTypes.SaV, "SAV_Char_Playbooks.json" }
		};

		public static Dictionary<GameType.GameTypes, string> CrewPlaybookNames { get; } = new()
		{
			{ GameType.GameTypes.BitD, "BITD_Crew_Playbooks.json" },
			{ GameType.GameTypes.SaV, "SAV_Crew_Playbooks.json" }
		};
	}
}
