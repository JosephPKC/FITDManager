namespace FitdEntity.Sheets
{
	public abstract class BaseSheet : BaseEntity
	{
		public string Name { get; set; } = string.Empty;
		public required DateTime DateCreated { get; set; }
		public DateTime? DateLastModified { get; set; }
		public string Notes { get; set; } = string.Empty;

		/* Playbooks */
		public Guid PlaybookId { get; set; }
	}
}
