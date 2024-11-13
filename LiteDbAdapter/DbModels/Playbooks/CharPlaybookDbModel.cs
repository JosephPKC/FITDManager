using LiteDbAdapter.DbModels.Actions;
using LiteDbAdapter.DbModels.DbDataParts.Builds;
using LiteDbAdapter.DbModels.DbDataParts.Items;

namespace LiteDbAdapter.DbModels.Playbooks
{
    public class CharPlaybookDbModel : PlaybookDbModel
	{
		// Items
		public IReadOnlyCollection<ItemDbModel> Items { get; set; } = [];

		// Builds
		public IReadOnlyCollection<BuildDbModel> Builds { get; set; } = [];

		// Actions
		public IReadOnlyDictionary<BitdAttributeActions.Actions, int>? StartingActions { get; set; } = null;
	}
}
