namespace FitdEntity.Sheets.Contacts
{
	public class ContactSet
	{
		public ICollection<SheetContact> FriendlyContactIds { get; set; } = [];
		public ICollection<SheetContact> NeutralContactIds { get; set; } = [];
		public ICollection<SheetContact> RivalContactIds { get; set; } = [];
	}
}
