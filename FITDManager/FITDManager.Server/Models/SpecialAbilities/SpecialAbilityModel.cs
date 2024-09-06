namespace FITDManager.Server.Models.SpecialAbilities
{
	public class SpecialAbilityModel : BaseModel
	{
		public string Text { get; set; } = string.Empty;
		public int NbrOfDots { get; set; } = 1;
		// TODO: Will need to add effect parameters in the json and here.
	}
}
