namespace FitdEntity.Sheets
{
	public abstract class BaseCharSheet : BaseSheet
	{
		public int MaxActionRating { get; set; } = 4;
		public int MaxAttributeRating { get; set; } = 4;
	}
}
