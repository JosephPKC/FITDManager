using LiteDbAdapter.DbModels.DbDataParts.Abilities;
using LiteDbAdapter.DbModels.DbDataParts.Contacts;

namespace LiteDbAdapter.DbModels.Playbooks
{
    public class PlaybookDbModel : BaseDbModel
	{
		public string SubName { get; set; } = string.Empty;
		public string XpTrigger { get; set; } = string.Empty;

		// Abilities
		public int? StartingAbilityIndex { get; set; } = null;
		public int DefaultAbilityIndex { get; set; } = 0;
		public IReadOnlyCollection<AbilityDbModel> Abilities { get; set; } = [];

		// Contacts
		public IReadOnlyCollection<ContactDbModel> Contacts { get; set; } = [];
	}
}
