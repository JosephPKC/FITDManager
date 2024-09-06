using FITDManager.Server.Models.Builds;
using FITDManager.Server.Models.Contacts;
using FITDManager.Server.Models.Items;
using FITDManager.Server.Models.SpecialAbilities;

namespace FITDManager.Server.Models.Playbooks
{
	public class PlaybookModel<TActionType> : BaseNotedModel where TActionType : Enum
	{
		public string Subtitle { get; set; } = string.Empty;
		public IEnumerable<string> Description { get; set; } = [];
		public string XpTrigger { get; set; } = string.Empty;

		public IEnumerable<SpecialAbilityModel> SpecialAbilities { get; set; } = [];
		public IEnumerable<ContactModel> Contacts { get; set; } = [];
		public IEnumerable<ItemModel> Items { get; set; } = [];
		public IEnumerable<BuildModel<TActionType>> StartingBuilds { get; set; } = [];
		public Dictionary<TActionType, int> StartingActionDots { get; set; } = [];
	}
}
