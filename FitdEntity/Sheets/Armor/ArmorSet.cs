namespace FitdEntity.Sheets.Armor
{
	public class ArmorSet
	{
		public ArmorStates HasArmor { get; set; } = ArmorStates.None;
		public ArmorStates HasHeavy { get; set; } = ArmorStates.None;
		public ArmorStates HasSpecial { get; set; } = ArmorStates.None;
	}
}
