using FitdConfig;
using FitdEntity.Sheets;

namespace FitdEntityControls.SheetSaveManager
{
	public interface ISheetLoader<TSheet> where TSheet : BaseSheet
	{
		TSheet? Load(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
		ICollection<SheetMetaData> GetAllSheetMetaData(GameTypes pGameType, EntityTypes pEntityType);
	}
}
