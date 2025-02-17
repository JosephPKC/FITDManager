namespace FitdCoreEntity.Sheets
{
	public abstract class BaseCharSheetEntity : BaseSheetEntity
	{
		public int MaxActionRating { get; set; } = 4;
		public int MaxAttributeRating { get; set; } = 4;
	}
}
