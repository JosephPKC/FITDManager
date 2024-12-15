namespace FitdEntity.Sheets
{
	public abstract class BaseSheetPart : BaseEntity
	{
		public int? RefId { get; set; } = null;
		public bool IsCustom { get; set; } = false;
	}
}
