namespace FitdConfig.Configs
{
	public static class Names
	{
		public static IReadOnlyDictionary<ColType, string> DbNames { get; } = new Dictionary<ColType, string>(new ColTypeComparer())
		{
			{ new ColType(EntityTypes.CharPlaybook, GameTypes.BitD), "BITD_Char_Playbooks" },
			{ new ColType(EntityTypes.CrewPlaybook, GameTypes.BitD), "BITD_Crew_Playbooks" },
			{ new ColType(EntityTypes.CharSheet, GameTypes.BitD), "BITD_Char_Sheets" },
			{ new ColType(EntityTypes.CrewSheet, GameTypes.BitD), "BITD_Crew_Sheets" },
			{ new ColType(EntityTypes.CharSpecialAbility, GameTypes.BitD), "BITD_Char_SpecialAbilities" },
			{ new ColType(EntityTypes.CrewSpecialAbility, GameTypes.BitD), "BITD_Crew_SpecialAbilities" },
			{ new ColType(EntityTypes.CharPlaybook, GameTypes.SaV), "SAV_Char_Playbooks" },
			{ new ColType(EntityTypes.CrewPlaybook, GameTypes.SaV), "SAV_Crew_Playbooks" },
			{ new ColType(EntityTypes.CharSheet, GameTypes.SaV), "SAV_Char_Sheets" },
			{ new ColType(EntityTypes.CrewSheet, GameTypes.SaV), "SAV_Crew_Sheets" },
			{ new ColType(EntityTypes.CharSpecialAbility, GameTypes.SaV), "SAV_Char_SpecialAbilities" },
			{ new ColType(EntityTypes.CrewSpecialAbility, GameTypes.SaV), "SAV_Crew_SpecialAbilities" },
		};

		public static IReadOnlyDictionary<ColType, string> JsonNames { get; } = new Dictionary<ColType, string>(new ColTypeComparer())
		{
			{ new ColType(EntityTypes.CharPlaybook, GameTypes.BitD), "Playbooks/BITD_Char_Playbooks.json" },
			{ new ColType(EntityTypes.CrewPlaybook, GameTypes.BitD), "Playbooks/BITD_Crew_Playbooks.json" },
			{ new ColType(EntityTypes.CharSpecialAbility, GameTypes.BitD), "SpecialAbilities/BITD_Char_SpecialAbilities.json" },
			{ new ColType(EntityTypes.CrewSpecialAbility, GameTypes.BitD), "SpecialAbilities/BITD_Crew_SpecialAbilities.json" },
			{ new ColType(EntityTypes.CharPlaybook, GameTypes.SaV), "Playbooks/SAV_Char_Playbooks.json" },
			{ new ColType(EntityTypes.CrewPlaybook, GameTypes.SaV), "Playbooks/SAV_Crew_Playbooks.json" },
			{ new ColType(EntityTypes.CharSpecialAbility, GameTypes.SaV), "SpecialAbilities/SAV_Char_SpecialAbilities.json" },
			{ new ColType(EntityTypes.CrewSpecialAbility, GameTypes.SaV), "SpecialAbilities/SAV_Crew_SpecialAbilities.json" },
		};
	}
}
