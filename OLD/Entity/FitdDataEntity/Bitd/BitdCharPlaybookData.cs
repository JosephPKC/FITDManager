using FitdDataEntity.Playbooks;
using FitdDataEntity.Playbooks.Parts;

namespace FitdDataEntity.Bitd
{
	public class BitdCharPlaybookData : BaseCharPlaybookData
	{
		/* Special Abilities */
		public ICollection<SpecialAbilityRefData> SpecialAbilities { get; init; } = [];
		public int DefaultSpecialAbilityId { get; init; } = 1;

		/* Starting Actions & Builds */
		public IDictionary<string, int> StartingActions { get; init; } = new Dictionary<string, int>();
		public ICollection<BuildRefData> StartingBuilds { get; init; } = [];

		/* Contacts & Items */
		public ICollection<ContactRefData> Contacts { get; init; } = [];
		public ICollection<ItemRefData> Items { get; init; } = [];
	}
}
