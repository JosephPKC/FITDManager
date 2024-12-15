using FitdEntity.Playbooks.SpecialAbilities;

namespace FitdEntity.Playbooks
{
	public abstract class BasePlaybook : BaseRef
	{
		/* Basic Data */
		public string SubName { get; init; } = string.Empty;
		public string Description { get; init; } = string.Empty;
		public string XpTrigger { get; init; } = string.Empty;

		/* Special Abilities */
		public IReadOnlyDictionary<int, PlaybookSpecialAbility> SpecialAbilities { get; init; } = new Dictionary<int, PlaybookSpecialAbility>();
		public int? StartingSpecialAbilityId { get; init; } = null;
		public int? DefaultSpecialAbilityId { get; init; } = null;
	}
}
