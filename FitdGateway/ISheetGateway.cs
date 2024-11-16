using FitdEntity.Sheets;

namespace FitdGateway
{
    /// <summary>
    /// Adapters to the Sheet db need to implement this.
    /// </summary>
    public interface ISheetGateway
    {
        void Add<TSheet>(TSheet pSheet) where TSheet : BaseSheet;
        void Delete<TSheet>(int pId) where TSheet : BaseSheet;
        void DeleteAll<TSheet>() where TSheet : BaseSheet;
        TSheet? Get<TSheet>(int pId) where TSheet : BaseSheet;
        ICollection<TSheet> GetAll<TSheet>() where TSheet : BaseSheet;
        void Update<TSheet>(TSheet pSheet) where TSheet : BaseSheet;
    }
}
