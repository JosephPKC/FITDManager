using FitdEntity.DbRefs.Playbooks;
using FitdEntity.DbRefs.Playbooks.Builds;
using FitdEntity.Playbooks.Contacts;
using FitdEntity.Playbooks.Items;

namespace FitdEntity.Bitd.Playbooks
{
	public class BitdCharPlaybookRef : BaseCharPlaybookRef
	{
		/* Starting Actions & Builds */
		public IDictionary<BitdActions.Actions, int> StartingActions { get; init; } = new Dictionary<BitdActions.Actions, int>();
		public ICollection<PlaybookBuildRef<BitdActions.Actions>> StartingBuilds { get; init; } = [];

		/* Contacts & Items */
		public ICollection<PlaybookContact> Contacts { get; init; } = [];
		public ICollection<PlaybookItem> Items { get; init; } = [];
	}
}
