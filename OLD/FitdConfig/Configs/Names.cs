namespace FitdConfig.Configs
{
	public static class Names
	{
		public static string DbBaseFilePath { get; } = @"..\..\..\..\Data\DbData\";
		public static string DbFileName { get; } = @"FitdRefDb.db";
		public static string JsonBaseFilePath { get; } = @"..\..\..\JsonData\";

		private static readonly Dictionary<string, string> _dbNames = new()
		{
			{ "BitD_CharPlaybook", "BITD_Char_Playbooks" },
			{ "BitD_CrewPlaybook", "BITD_Crew_Playbooks" },
			{ "BitD_CharSheet", "BITD_Char_Sheets" },
			{ "BitD_CrewSheet", "BITD_Crew_Sheets" },
			{ "BitD_CharSpecialAbility", "BITD_Char_SpecialAbilities" },
			{ "BitD_CrewSpecialAbility", "BITD_Crew_SpecialAbilities" },
			{ "SaV_CharPlaybook", "SAV_Char_Playbooks" },
			{ "SaV_CrewPlaybook", "SAV_Crew_Playbooks" },
			{ "SaV_CharSheet", "SAV_Char_Sheets" },
			{ "SaV_CrewSheet", "SAV_Crew_Sheets" },
			{ "SaV_CharSpecialAbility", "SAV_Char_SpecialAbilities" },
			{ "SaV_CrewSpecialAbility", "SAV_Crew_SpecialAbilities" },
		};

		private static readonly Dictionary<string, string> _jsonNames = new()
		{
			{ "BitD_CharPlaybook", "Playbooks/BITD_Char_Playbooks.json" },
			{ "BitD_CrewPlaybook", "Playbooks/BITD_Crew_Playbooks.json" },
			{ "BitD_CharSpecialAbility", "SpecialAbilities/BITD_Char_SpecialAbilities.json" },
			{ "BitD_CrewSpecialAbility", "SpecialAbilities/BITD_Crew_SpecialAbilities.json" },
			{ "SaV_CharPlaybook", "Playbooks/SAV_Char_Playbooks.json" },
			{ "SaV_CrewPlaybook", "Playbooks/SAV_Crew_Playbooks.json" },
			{ "SaV_CharSpecialAbility", "SpecialAbilities/SAV_Char_SpecialAbilities.json" },
			{ "SaV_CrewSpecialAbility", "SpecialAbilities/SAV_Crew_SpecialAbilities.json" },
		};

		public static string GetDbName(GameTypes pGameType, EntityTypes pEntityType)
		{
			string key = $"{pGameType}_{pEntityType}";
			if (_dbNames.TryGetValue(key, out string? value))
			{
				return value;
			}
			return "";
		}

		public static string GetJsonName(GameTypes pGameType, EntityTypes pEntityType)
		{
			string key = $"{pGameType}_{pEntityType}";
			if (_jsonNames.TryGetValue(key, out string? value))
			{
				return value;
			}
			return "";
		}
	}
}
