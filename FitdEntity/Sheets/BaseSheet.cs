using FitdConfig;
using FitdEntity.Sheets.SpecialAbilities;

namespace FitdEntity.Sheets
{
	public abstract class BaseSheet : BaseEntity
	{
		public required DateTime DateCreated { get; init; }
		public DateTime? DateLastModified { get; set; } = null;
		public string Notes { get; set; } = string.Empty;
		public GameTypes GameType { get; set; } = GameTypes.None;

		/* Playbooks */
		public int PlaybookId { get; set; } = 0;

		/* Special Abilities */
		public IDictionary<Guid, SpecialAbility> AvailableSpecialAbilities { get; set; } = new Dictionary<Guid, SpecialAbility>();
		public ISet<Guid> LearnedSpecialAbilities { get; set; } = new HashSet<Guid>();
	}
}
