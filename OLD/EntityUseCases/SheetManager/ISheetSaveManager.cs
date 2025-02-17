using FitdCoreEntity.Sheets;

namespace SheetManager
{
	public interface ISheetSaveManager<TSheet> : ISheetDeleter<TSheet>, ISheetLoader<TSheet>, ISheetSaver<TSheet> where TSheet : BaseSheetEntity
	{
	}
}
