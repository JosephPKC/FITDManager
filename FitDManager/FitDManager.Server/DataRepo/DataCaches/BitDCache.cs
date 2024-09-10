using FitDManager.Server.Models.Abilities;
using FitDManager.Server.Models.Builds;
using FitDManager.Server.Models.Contacts;
using FitDManager.Server.Models.Items;
using FitDManager.Server.Models.Playbooks;

namespace FitDManager.Server.DataRepo.DataCaches
{
	public class BitDCache : BaseCache
	{
		/* Master Lists of ALL data parts for the game. */
		public IReadOnlyList<ContactRef> Contacts { get; set; } = [];
		public IReadOnlyList<ItemRef> Items { get; set; } = [];
		public IReadOnlyList<SpecialAbilityRef> SpecialAbilities { get; set; } = [];
		public IReadOnlyList<BitDBuildRef> Builds { get; set; } = [];

		/* Full Data: Full data models that are built out by referencing other data parts. */
		public IReadOnlyList<BitDPlaybookRef> Playbooks { get; set; } = [];
	}
}
