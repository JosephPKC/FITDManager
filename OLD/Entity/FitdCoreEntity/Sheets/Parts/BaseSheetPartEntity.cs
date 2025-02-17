namespace FitdCoreEntity.Sheets.Parts
{
	public abstract class BaseSheetPartEntity : BaseNonRefEntity
	{
		public int? RefId { get; set; } = null;
		public bool IsCustom { get; set; } = false;
	}
}
