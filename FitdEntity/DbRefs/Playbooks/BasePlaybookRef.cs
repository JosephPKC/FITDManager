using FitdEntity.Playbooks.SpecialAbilities;

namespace FitdEntity.DbRefs.Playbooks
{
	public abstract class BasePlaybookRef : BaseRef
	{
		/* Basic Data */
		public string SubName { get; init; } = string.Empty;
		public string Description { get; init; } = string.Empty;
		public string XpTrigger { get; init; } = string.Empty;

		/* Special Abilities */
		public ICollection<PlaybookSpecialAbility> SpecialAbilities { get; init; } = [];
		public int? StartingSpecialAbilityId { get; init; } = null;
		public int? DefaultSpecialAbilityId { get; init; } = null;
	}
}
