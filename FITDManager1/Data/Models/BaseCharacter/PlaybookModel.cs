namespace FITDManager.Data.Models.BaseCharacter
{
    public class PlaybookModel : BaseDataModel
    {
        public string Name { get; set; } = string.Empty;
        public string SubName { get; set; } = string.Empty;
        public IEnumerable<string> Description { get; set; } = [];
        public string XpTrigger { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;

        // Special Abilities
        public IEnumerable<SpecialAbilityModel> SpecialAbilities { get; set; } = [];

        // Contacts
        public IEnumerable<ContactModel> Contacts { get; set; } = [];

        // Items
        public IEnumerable<ItemModel> Items { get; set; } = [];
    }
}
