using FitdConfig;
using FitdCoreEntity.Sheets;
using SheetMetaDataBuilder;

namespace SheetManager
{
    public interface ISheetLoader<TSheet> where TSheet : BaseSheetEntity
    {
        ICollection<SheetMetaData> GetAllSheetMetaData(GameTypes pGameType, EntityTypes pEntityType);
        TSheet? Load(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
    }
}
