using DataGateway.SheetGateway;
using EntityMapper;
using FitdConfig;
using FitdCoreEntity.Sheets;
using FitdDataEntity.Sheets;
using GistBuilder.SheetGists;

namespace SheetManager
{
    internal class SheetSaveManager<TData, TEntity>(ISheetGateway pGateway, IMapper<TData, TEntity> pMapper) : ISheetSaveManager<TEntity>, ISheetDeleter<TEntity>, ISheetLoader<TEntity>, ISheetSaver<TEntity> 
		where TData : BaseSheetData 
		where TEntity : BaseSheetEntity
	{
		protected readonly ISheetGateway _gateway = pGateway;
		protected readonly IMapper<TData, TEntity> _mapper = pMapper;

		#region "ISheetDeleter"
		public void Clear(GameTypes pGameType, EntityTypes pEntityType)
		{
			_gateway.Clear<TData>(pGameType, pEntityType);
		}

		public void Delete(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			_gateway.Delete<TData>(pGameType, pEntityType, pId);
		}
		#endregion

		#region "ISheetLoader"
		public ICollection<SheetGist> GetAllSheetMetaData(GameTypes pGameType, EntityTypes pEntityType)
		{
			ICollection<TData> sheets = _gateway.GetAll<TData>(pGameType, pEntityType);

			if (sheets.Count == 0)
			{
				return [];
			}

			List<SheetGist> collection = [];
			foreach (TData sheet in sheets)
			{
				collection.Add(SheetGistBuilder.BuildGistFromData(sheet));
			}
			return collection;
		}

		public TEntity? Load(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			TData? data = _gateway.Get<TData>(pGameType, pEntityType, pId);
			if (data is null)
			{
				return default;
			}

			return _mapper.MapEntityFromData(data);
		}
		#endregion

		#region "ISheetSaver"
		public void Save(GameTypes pGameType, EntityTypes pEntityType, TEntity pSheet)
		{
			TData data = _mapper.MapDataFromEntity(pSheet);
			if (_gateway.Contains<TData>(pGameType, pEntityType, data.Id))
			{
				_gateway.Update(pGameType, pEntityType, data);
			}
			else
			{
				_gateway.Add(pGameType, pEntityType, data);
			}
		}


		#endregion
	}
}
