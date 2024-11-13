namespace LiteDbAdapter.DbModels.DbDataParts.Items
{
    public class ItemDbModel : BaseDbModelPart
    {
        public string Description { get; set; } = string.Empty;
		public int Loadout { get; set; } = 1;
    }
}
