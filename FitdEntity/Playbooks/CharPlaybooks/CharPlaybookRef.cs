using FitdEntity.Playbooks.DataParts.Items;

namespace FitdEntity.Playbooks.CharPlaybooks
{
    public class CharPlaybookRef : BasePlaybookRef
    {
        // Items
        public IReadOnlyCollection<ItemRef> Items { get; set; } = [];
    }
}
