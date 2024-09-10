namespace FitDManager.Server.Models.Items
{
	public class ItemRef : BaseModelRef
	{
		public string Description { get; set; } = string.Empty;
		public int Loadout { get; set; } = 1;
	}
}
