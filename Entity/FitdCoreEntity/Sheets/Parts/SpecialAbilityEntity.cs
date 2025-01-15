namespace FitdCoreEntity.Sheets.Parts
{
	public class SpecialAbilityEntity : BaseSheetPartEntity
	{
		public string Text { get; set; } = string.Empty;
		public int NbrOfBoxes { get; set; } = 0;
		public bool IsFromVeteran { get; set; } = false;
	}
}
