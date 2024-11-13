namespace LiteDbAdapter.DbModels.DbDataParts.Claims
{
	public class ClaimDbModel : BaseDbModelPart
	{
		public string Description { get; set; } = string.Empty;
		public ClaimPos? Position { get; set; } = null;
	}
}
