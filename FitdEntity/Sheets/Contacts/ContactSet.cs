namespace FitdEntity.Sheets.Contacts
{
	public class ContactSet
	{
		public ISet<Guid> FriendlyContactIds { get; set; } = new HashSet<Guid>();
		public ISet<Guid> NeutralContactIds { get; set; } = new HashSet<Guid>();
		public ISet<Guid> RivalContactIds { get; set; } = new HashSet<Guid>();
	}
}
