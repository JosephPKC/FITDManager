using FitdCoreEntity.Playbooks;
using FitdCoreEntity.Playbooks.Parts;

namespace FitdCoreEntity.Bitd
{
	public class BitdCharPlaybookEntity : BaseCharPlaybookEntity
	{
		/* Special Abilities */
		public ICollection<SpecialAbilityRefEntity> SpecialAbilities { get; init; } = [];
		public int DefaultSpecialAbilityId { get; init; } = 1;

		/* Starting Actions & Builds */
		public IDictionary<BitdActions.Actions, int> StartingActions { get; init; } = new Dictionary<BitdActions.Actions, int>();
		public ICollection<BuildRefEntity<BitdActions.Actions>> StartingBuilds { get; init; } = [];

		/* Contacts & Items */
		public ICollection<ContactRefEntity> Contacts { get; init; } = [];
		public ICollection<ItemRefEntity> Items { get; init; } = [];
	}
}
