namespace FitdEntity.Sheets
{
    public abstract class BaseSheet : BaseModel
	{
		public required DateTime DateCreated { get; set; }
		public DateTime? DateLastUpdated { get; set; }

		public required string Name { get; set; }
	}
}
