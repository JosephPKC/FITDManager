using FitdConfig;
using FitdCoreEntity.Sheets;
using GistBuilder.SheetGists;

namespace SheetManager
{
    public interface ISheetLoader<TSheet> where TSheet : BaseSheetEntity
    {
        ICollection<SheetGist> GetAllSheetMetaData(GameTypes pGameType, EntityTypes pEntityType);
        TSheet? Load(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
    }
}
