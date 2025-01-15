using FitdConfig;
using FitdCoreEntity.Sheets;
using FitdDataEntity.Sheets;

namespace SheetMetaDataBuilder
{
	public static class SheetMetaDataBuilder
	{
		public static SheetMetaData BuildMetaDataFromEntity<TSheet>(TSheet pSheet) where TSheet : BaseSheetEntity
		{
			return new()
			{
				Id = pSheet.Id,
				Name = pSheet.Name,
				DateCreated = pSheet.DateCreated,
				DateLastModified = pSheet.DateLastModified,
				GameType = pSheet.GameType
			};
		}

		public static SheetMetaData BuildMetaDataFromData<TSheet>(TSheet pSheet) where TSheet : BaseSheetData
		{
			return new()
			{
				Id = pSheet.Id,
				Name = pSheet.Name,
				DateCreated = DateTime.Parse(pSheet.DateCreated),
				DateLastModified = !string.IsNullOrWhiteSpace(pSheet.DateLastModified) ? DateTime.Parse(pSheet.DateLastModified) : null,
				GameType = Enum.Parse<GameTypes>(pSheet.GameType)
			};
		}
	}
}
