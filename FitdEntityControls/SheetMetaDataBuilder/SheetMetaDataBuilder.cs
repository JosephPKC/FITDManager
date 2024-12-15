using FitdEntity.Sheets;

namespace FitdEntityControls.SheetMetaDataBuilder
{
	public static class SheetMetaDataBuilder
	{
		public static SheetMetaData BuildMetaData<TSheet>(TSheet pSheet) where TSheet : BaseSheet
		{
			return new() {
				Id = pSheet.Id,
				Name = pSheet.Name,
				DateCreated = pSheet.DateCreated,
				DateLastModified = pSheet.DateLastModified,
				GameType = pSheet.GameType
			};
		}
	}
}
