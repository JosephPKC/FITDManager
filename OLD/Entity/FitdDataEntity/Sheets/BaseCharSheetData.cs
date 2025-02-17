namespace FitdDataEntity.Sheets
{
	public abstract class BaseCharSheetData : BaseSheetData
	{
		public int MaxActionRating { get; set; } = 4;
		public int MaxAttributeRating { get; set; } = 4;
	}
}
