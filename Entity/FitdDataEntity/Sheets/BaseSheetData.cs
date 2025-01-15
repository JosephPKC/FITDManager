namespace FitdDataEntity.Sheets
{
	public abstract class BaseSheetData : BaseNonRefData
	{
		public string DateCreated { get; init; } = string.Empty;
		public string DateLastModified { get; set; } = string.Empty;
		public string Notes { get; set; } = string.Empty;
		public string GameType { get; set; } = string.Empty;
		public int PlaybookRefId { get; set; } = 0;
	}
}
