using FitdConfig;
using FitdCoreEntity.Sheets;

namespace SheetManager
{
    public interface ISheetDeleter<TSheet> where TSheet : BaseSheetEntity
	{
		void Clear(GameTypes pGameType, EntityTypes pEntityType);
		void Delete(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
	}
}
