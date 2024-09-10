using FitDManager.Server.Models.Actions;

namespace FitDManager.Server.Models.Playbooks
{
	/// <summary>
	/// A separate model for json loading purposes.
	/// </summary>
	public class PlaybookJson<TAction> : BaseModelJson where TAction : Enum
	{
		public string Subname { get; set; } = string.Empty;
		public List<string> Description { get; set; } = [];
		public string XpTrigger { get; set; } = string.Empty;
		public int? DefaultSpecialAbilityId { get; set; } = null;
		public int? StartingSpecialAbilityId { get; set; } = null;
		public List<int> SpecialAbilities { get; set; } = [];
		public List<int> Items { get; set; } = [];
		public List<int> Contacts { get; set; } = [];
		public List<int> StartingBuilds { get; set; } = [];
		public Dictionary<TAction, int> StartingActionDots { get; set; } = [];
	}

	public class BitDPlaybookJson : PlaybookJson<BitDActions> { }
}
