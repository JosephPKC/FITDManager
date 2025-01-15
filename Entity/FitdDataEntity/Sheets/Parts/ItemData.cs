namespace FitdDataEntity.Sheets.Parts
{
    public class ItemData : BaseSheetPartData
	{
		public string Text { get; set; } = string.Empty;
		public int Loadout { get; set; } = 1;
		public bool IsCommon { get; set; } = false;
		public bool IsCrafted { get; set; } = false;
	}
}
