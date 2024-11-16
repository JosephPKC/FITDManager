namespace FitdEntity.Playbooks.DataParts.Claims
{
    public class ClaimRef : BaseDataPart
    {
        public string Description { get; set; } = string.Empty;
        public ClaimPos Position { get; set; } = new();
    }
}
