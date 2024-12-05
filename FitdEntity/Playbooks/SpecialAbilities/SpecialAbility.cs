namespace FitdEntity.Playbooks.SpecialAbilities
{
	/// <summary>
	/// Special Abilities can be created independently and saved. So, they are an entity.
	/// </summary>
	public class SpecialAbility : BaseCustomizableDataPart
	{
		public string Description { get; set; } = string.Empty;
		public int Boxes { get; set; } = 1;
	}
}
