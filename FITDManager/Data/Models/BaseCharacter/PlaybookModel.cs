using LiteDbWrapper;

namespace FITDManager.Data.Models.BaseCharacter
{
    /// <summary>
    /// Inherits the LiteDbWrapper's LiteDbModel.
    /// Contains all data regarding a FITD game's playbook.
    /// </summary>
    public class PlaybookModel : LiteDbModel
    {
        public string Name { get; set; } = string.Empty;
        public string SubName { get; set; } = string.Empty;
        public IEnumerable<string> Description { get; set; } = [];
        public string XpTrigger { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;

        // Special Abilities
        public IEnumerable<SpecialAbilityModel> SpecialAbilities { get; set; } = [];
        /// <summary>
        /// The first ability is considered the default. I.E, when in doubt, you get this one as your first ability.
        /// </summary>
        public int DefaultSpecialAbilityId { get; set; } = 0;
        /// <summary>
        /// There may be times where the first ability chosen is mandatory.
        /// </summary>
        public int? MandatorySpecialBilityId { get; set; } = null;

        // Contacts
        public IEnumerable<ContactModel> Contacts { get; set; } = [];

        // Items
        public IEnumerable<ItemModel> Items { get; set; } = [];
    }
}
