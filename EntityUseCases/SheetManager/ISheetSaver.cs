using FitdConfig;
using FitdCoreEntity.Sheets;

namespace SheetManager
{
    public interface ISheetSaver<TSheet> where TSheet : BaseSheetEntity
    {
        void Save(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet);
    }
}
