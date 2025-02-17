using FitdConfig;

namespace FitdCoreEntity.Sheets
{
	public abstract class BaseSheetEntity : BaseNonRefEntity
	{
		public DateTime DateCreated { get; init; }
		public DateTime? DateLastModified { get; set; }
		public string Notes { get; set; } = string.Empty;
		public GameTypes GameType { get; set; } = GameTypes.None;
		public int PlaybookRefId { get; set; } = 0;
	}
}
