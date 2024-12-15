using FitdConfig;

namespace FitdEntity.Sheets
{
	public class SheetMetaData : BaseEntity
	{
		public required DateTime DateCreated { get; init; }
		public DateTime? DateLastModified { get; set; } = null;
		public GameTypes GameType { get; set; } = GameTypes.None;
	}
}
