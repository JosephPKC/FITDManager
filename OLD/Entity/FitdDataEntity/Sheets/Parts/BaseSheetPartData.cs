namespace FitdDataEntity.Sheets.Parts
{
    public abstract class BaseSheetPartData : BaseNonRefData
    {
        public int? RefId { get; set; } = null;
        public bool IsCustom { get; set; } = false;
    }
}
