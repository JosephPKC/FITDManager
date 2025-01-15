using FitdEntityCommon.Tracks;

namespace EntityMapper
{
	internal static class MapperUtils
	{
		public static (int, int, int) ParseTrack(Track pTrack)
		{
			return (pTrack.NbrOfBoxes, pTrack.NbrOfMarks, pTrack.MinNbrOfMarks);
		}

		public static (int, ICollection<TData>) ParseContainerTrack<TData>(ContainerTrack<TData> pTrack)
		{
			return (pTrack.MaxItems, pTrack.Items);
		}

		public static IDictionary<string, TData> ParseEnumDict<TEnum, TData>(IDictionary<TEnum, TData> pDict) where TEnum : Enum
		{
			Dictionary<string, TData> result = [];
			foreach (KeyValuePair<TEnum, TData> keyValuePair in pDict)
			{
				result.Add(keyValuePair.Key.ToString().ToUpper(), keyValuePair.Value);
			}
			return result;
		}

		public static IDictionary<TEnum, TData> ParseToEnumDict<TEnum, TData>(IDictionary<string, TData> pDict) where TEnum : struct, Enum
		{
			Dictionary<TEnum, TData> result = [];
			foreach (KeyValuePair<string, TData> keyValuePair in pDict)
			{
				result.Add(Enum.Parse<TEnum>(ToSingleWordTitleCase(keyValuePair.Key)), keyValuePair.Value);
			}
			return result;
		}

		public static int ParseTriState<TState>(TState pState, TState pPositiveState, TState pNegativeState) where TState : Enum
		{
			if (pState.Equals(pPositiveState))
			{
				return 1;
			}
			else if (pState.Equals(pNegativeState))
			{
				return -1;
			}
			return 0;
		}

		public static TState ParseToTriState<TState>(int pState, TState pPositiveState, TState pNegativeState, TState pNeutralState) where TState : Enum
		{
			if (pState > 0)
			{
				return pPositiveState;
			}
			else if (pState < 0)
			{
				return pNegativeState;
			}
			return pNeutralState;
		}

		public static ICollection<TDest> ParseObjCol<TSrc, TDest>(ICollection<TSrc> pSrc, Func<TSrc, TDest> pMapper)
		{
			List<TDest> result = [];
			foreach (TSrc src in pSrc)
			{
				result.Add(pMapper(src));
			}
			return result;
		}

		public static ICollection<TData> CreateColCopy<TData>(ICollection<TData> pSrc)
		{
			TData[] result = [];
			pSrc.CopyTo(result, 0);
			return result;
		}

		public static IDictionary<TKey, TVal> CreateColCopy<TKey, TVal>(IDictionary<TKey, TVal> pSrc) where TKey : notnull
		{
			KeyValuePair<TKey, TVal>[] result = [];
			pSrc.CopyTo(result, 0);
			return result.ToDictionary();
		}

		public static ISet<TData> CreateColCopy<TData>(ISet<TData> pSrc) where TData : notnull
		{
			TData[] result = [];
			pSrc.CopyTo(result, 0);
			return result.ToHashSet();
		}

		public static string ToSingleWordTitleCase(string pStr)
		{
			if (string.IsNullOrWhiteSpace(pStr))
			{
				return string.Empty;
			}

			if (pStr.Length == 1)
			{
				return pStr.ToUpper();
			}

			string firstChar = $"{pStr[0]}".ToUpper();
			string restChars = pStr.Substring(1).ToLower();

			return $"{firstChar}{restChars}";
		}
	}
}
