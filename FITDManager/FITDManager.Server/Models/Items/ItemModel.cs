namespace FITDManager.Server.Models.Items
{
	public class ItemModel : BaseNotedModel
	{
		public string Description { get; set; } = string.Empty;
		public int Loadout { get; set; } = 0;
	}
}
