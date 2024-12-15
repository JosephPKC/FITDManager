using FitdConfig;
using FitdEntity.Sheets;

namespace FitdEntityControls.SheetSaveManager
{
	public interface ISheetSaver<TSheet> where TSheet : BaseSheet
	{
		void Save(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet);
	}
}
