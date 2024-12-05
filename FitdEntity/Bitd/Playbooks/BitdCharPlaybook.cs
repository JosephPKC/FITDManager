using FitdEntity.Playbooks;
using FitdEntity.Playbooks.Builds;
using FitdEntity.Playbooks.Contacts;
using FitdEntity.Playbooks.Items;
using FitdEntity.Playbooks.SpecialAbilities;

namespace FitdEntity.Bitd.Playbooks
{
	public class BitdCharPlaybook : BaseCharPlaybook
	{
		/* Starting Actions & Builds */
		public IReadOnlyDictionary<BitdActions.Actions, int> StartingActions { get; set; } = new Dictionary<BitdActions.Actions, int>();
		public IReadOnlyDictionary<Guid, Build<BitdActions.Actions>> StartingBuilds { get; set; } = new Dictionary<Guid, Build<BitdActions.Actions>>();

		/* Contacts & Items */
		public IReadOnlyDictionary<Guid, Contact> Contacts { get; set; } = new Dictionary<Guid, Contact>();
		public IReadOnlyDictionary<Guid, Item> Items { get; set; } = new Dictionary<Guid, Item>();

		/* Special Abilities */
		public IReadOnlyDictionary<Guid, SpecialAbility> SpecialAbilities { get; set; } = new Dictionary<Guid, SpecialAbility>();
		public Guid StartingSpecialAbilityId { get; set; }
		public Guid DefaultSpecialAbilityId { get; set; }
	}
}
