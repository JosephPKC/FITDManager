using FitdCoreEntity.Playbooks;
using FitdCoreEntity.Playbooks.Parts;

namespace FitdCoreEntity.Bitd
{
	public class BitdCharPlaybookEntity : BaseCharPlaybookEntity
	{
		/* Special Abilities */
		public IReadOnlyDictionary<int, SpecialAbilityRefEntity> SpecialAbilities { get; init; } = new Dictionary<int, SpecialAbilityRefEntity>();
		public int DefaultSpecialAbilityId { get; init; } = 1;

		/* Starting Actions & Builds */
		public IReadOnlyDictionary<BitdActions.Actions, int> StartingActions { get; init; } = new Dictionary<BitdActions.Actions, int>();
		public IReadOnlyDictionary<int, BuildRefEntity<BitdActions.Actions>> StartingBuilds { get; init; } = new Dictionary<int,  BuildRefEntity<BitdActions.Actions>>();

		/* Contacts & Items */
		public IReadOnlyDictionary<int, ContactRefEntity> Contacts { get; init; } = new Dictionary<int, ContactRefEntity>();
		public IReadOnlyDictionary<int, ItemRefEntity> Items { get; init; } = new Dictionary<int,  ItemRefEntity>();
	}
}
