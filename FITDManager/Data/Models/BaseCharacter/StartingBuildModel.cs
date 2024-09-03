namespace FITDManager.Data.Models.BaseCharacter
{
    public class StartingBuildModel : BaseDataModel
    {
        public string Name { get; set; } = string.Empty;
        public int StartingSpecialAbilityId { get; set; } = 0;
    }
}
