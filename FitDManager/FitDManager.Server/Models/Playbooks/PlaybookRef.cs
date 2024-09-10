using FitDManager.Server.Models.Abilities;
using FitDManager.Server.Models.Actions;
using FitDManager.Server.Models.Builds;
using FitDManager.Server.Models.Contacts;
using FitDManager.Server.Models.Items;

namespace FitDManager.Server.Models.Playbooks
{
	public class PlaybookRef<TAction> : BaseModelRef where TAction : Enum
	{
		public required string Subname { get; set; }
		public required IReadOnlyList<string> Description { get; set; }
		public required string XpTrigger { get; set; }
		public int? DefaultSpecialAbilityId { get; set; } = null;
		public int? StartingSpecialAbilityId { get; set; } = null;
		public required IReadOnlyList<SpecialAbilityRef> SpecialAbilities { get; set; }
		public required IReadOnlyList<ItemRef> Items { get; set; }
		public required IReadOnlyList<ContactRef> Contacts { get; set; }
		public required IReadOnlyList<BuildRef<TAction>> StartingBuilds { get; set; }
		public required IReadOnlyDictionary<TAction, int> StartingActionDots { get; set; }
	}

	public class BitDPlaybookRef : PlaybookRef<BitDActions> { }
}
