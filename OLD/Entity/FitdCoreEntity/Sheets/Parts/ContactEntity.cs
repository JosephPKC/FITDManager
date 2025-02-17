using FitdCoreEntity.Sheets.States;

namespace FitdCoreEntity.Sheets.Parts
{
	public class ContactEntity : BaseSheetPartEntity
	{
		public string Text { get; set; } = string.Empty;
		public ContactStates State { get; set; } = ContactStates.None;
	}
}
