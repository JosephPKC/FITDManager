namespace FitdEntity.Sheets.Items
{
	public class Item : BaseSheetPart
	{
		public string Text { get; set; } = string.Empty;
		public int Loadout { get; set; } = 1;
		public bool IsCommon { get; set; } = false;
	}
}
