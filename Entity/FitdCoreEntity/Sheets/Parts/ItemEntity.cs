namespace FitdCoreEntity.Sheets.Parts
{
	public class ItemEntity : BaseSheetPartEntity
	{
		public string Text { get; set; } = string.Empty;
		public int Loadout { get; set; } = 1;
		public bool IsCommon { get; set; } = false;
		public bool IsCrafted { get; set; } = false;
	}
}
