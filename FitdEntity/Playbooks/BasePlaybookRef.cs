using FitdEntity.Playbooks.DataParts.Abilities;
using FitdEntity.Playbooks.DataParts.Contacts;

namespace FitdEntity.Playbooks
{
    public class BasePlaybookRef : BaseRef
    {
        public string SubName { get; set; } = string.Empty;
        public string XpTrigger { get; set; } = string.Empty;

        // Abilities
        public int? StartingAbilityIndex { get; set; } = null;
        public int DefaultAbilityIndex { get; set; } = 0;
        public IReadOnlyCollection<AbilityRef> Abilities { get; set; } = [];

        // Contacts
        public IReadOnlyCollection<ContactRef> Contacts { get; set; } = [];
    }
}
