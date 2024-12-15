namespace FitdEntity.Sheets.SpecialAbilities
{
	public class SpecialAbility : BaseSheetPart
	{
		public string Text { get; set; } = string.Empty;
		public int NbrOfBoxes { get; set; } = 0;
		public bool IsFromVeteran { get; set; } = false;
	}
}
