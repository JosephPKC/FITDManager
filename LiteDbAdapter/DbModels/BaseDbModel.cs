using LiteDbWrapper;

namespace LiteDbAdapter.DbModels
{
	public abstract class BaseDbModel : LiteDbModel
	{
		public required string Name { get; set; }
	}
}
