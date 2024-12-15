using FitdEntity.Playbooks;
using FitdEntity.Playbooks.Builds;
using FitdEntity.Playbooks.Contacts;
using FitdEntity.Playbooks.Items;

namespace FitdEntity.Bitd.Playbooks
{
	public class BitdCharPlaybook : BaseCharPlaybook
	{
		/* Starting Actions & Builds */
		public IReadOnlyDictionary<BitdActions.Actions, int> StartingActions { get; init; } = new Dictionary<BitdActions.Actions, int>();
		public IReadOnlyDictionary<int, PlaybookBuild<BitdActions.Actions>> StartingBuilds { get; init; } = new Dictionary<int, PlaybookBuild<BitdActions.Actions>>();

		/* Contacts & Items */
		public IReadOnlyDictionary<int, PlaybookContact> Contacts { get; init; } = new Dictionary<int, PlaybookContact>();
		public IReadOnlyDictionary<int, PlaybookItem> Items { get; init; } = new Dictionary<int, PlaybookItem>();
	}
}
