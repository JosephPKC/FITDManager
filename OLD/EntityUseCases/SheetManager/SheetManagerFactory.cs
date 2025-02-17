using DataGateway.SheetGateway;
using EntityMapper;
using FitdCoreEntity.Sheets;
using FitdDataEntity.Sheets;

namespace SheetManager
{
	public static class SheetManagerFactory
	{
		public static ISheetSaveManager<TEntity> CreateNewSheetSaveManager<TData, TEntity>(ISheetGateway pGateway, IMapper<TData, TEntity> pMapper) where TData : BaseSheetData where TEntity : BaseSheetEntity
		{
			return new SheetSaveManager<TData, TEntity>(pGateway, pMapper);
		}

		public static ISheetDeleter<TEntity> CreateNewSheetDeleter<TData, TEntity>(ISheetGateway pGateway, IMapper<TData, TEntity> pMapper) where TData : BaseSheetData where TEntity : BaseSheetEntity
		{
			return new SheetSaveManager<TData, TEntity>(pGateway, pMapper);
		}

		public static ISheetLoader<TEntity> CreateNewSheetLoader<TData, TEntity>(ISheetGateway pGateway, IMapper<TData, TEntity> pMapper) where TData : BaseSheetData where TEntity : BaseSheetEntity
		{
			return new SheetSaveManager<TData, TEntity>(pGateway, pMapper);
		}

		public static ISheetSaver<TEntity> CreateNewSheetSaver<TData, TEntity>(ISheetGateway pGateway, IMapper<TData, TEntity> pMapper) where TData : BaseSheetData where TEntity : BaseSheetEntity
		{
			return new SheetSaveManager<TData, TEntity>(pGateway, pMapper);
		}
	}
}
