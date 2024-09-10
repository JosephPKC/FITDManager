namespace FitDManager.Server.Models.Abilities
{
	public class SpecialAbilityRef : BaseModelRef
	{
		public required string Text { get; set; }
		public int NbrOfDots { get; set; } = 1;
	}
}
