namespace FITDManager.Data.Models.BaseCharacter
{
    public class ItemModel : BaseDataModel
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        public int Loadout { get; set; } = 0;
    }
}
