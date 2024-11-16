namespace FitdConfig.Names
{
    public static class DbNames
    {
        /* Ref Db Names */
        public static Dictionary<GameType.GameTypes, string> CharPlaybookNames { get; } = new()
        {
            { GameType.GameTypes.BitD, "BITD_Char_Playbooks" },
			{ GameType.GameTypes.SaV, "SAV_Char_Playbooks" }
		};

		public static Dictionary<GameType.GameTypes, string> CrewPlaybookNames { get; } = new()
		{
			{ GameType.GameTypes.BitD, "BITD_Crew_Playbooks" },
			{ GameType.GameTypes.SaV, "SAV_Crew_Playbooks" }
		};

		private static ICollection<string>? _allRefNames = null;
		public static ICollection<string> AllRefNames {
			get
			{
				if (_allRefNames == null)
				{
					List<string> allRefNames = [.. CharPlaybookNames.Values];
					allRefNames.AddRange([.. CrewPlaybookNames.Values]);
					_allRefNames = allRefNames;
				}

				return _allRefNames;
			}
		}

		/* Sheet Db Names */
		public static Dictionary<GameType.GameTypes, string> CharSheetNames { get; } = new()
		{
			{ GameType.GameTypes.BitD, "BITD_Char_Sheets" },
			{ GameType.GameTypes.SaV, "SAV_Char_Sheets" }
		};

		public static Dictionary<GameType.GameTypes, string> CrewSheetNames { get; } = new()
		{
			{ GameType.GameTypes.BitD, "BITD_Crew_Sheets" },
			{ GameType.GameTypes.SaV, "SAV_Crew_Sheets" }
		};

		private static ICollection<string>? _allSheetNames = null;
		public static ICollection<string> AllSheetNames {
			get
			{
				if (_allSheetNames == null)
				{
					List<string> allSheetNames = [.. CharSheetNames.Values];
					allSheetNames.AddRange([.. CrewSheetNames.Values]);
					_allSheetNames = allSheetNames;
				}

				return _allSheetNames;
			}
		}
	}
}
