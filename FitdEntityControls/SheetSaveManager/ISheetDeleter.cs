using FitdConfig;
using FitdEntity.Sheets;

namespace FitdEntityControls.SheetSaveManager
{
	public interface ISheetDeleter<TSheet> where TSheet : BaseSheet
	{
		void Delete(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
	}
}
