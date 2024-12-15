using LiteDbWrapper.Wrappers;
using Utils.Exceptions;

using FitdConfig;
using FitdConfig.Configs;
using FitdGateway;

namespace LiteDbAdapter
{
	internal sealed class LiteDbAdapter(ILiteDbWrapper pDb) : IDataAdapter
	{
		private readonly ILiteDbWrapper _db = pDb;

		#region "IDataAdapter"
		public void Add<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId, TModel pModel)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Add(colName, pId, pModel);
		}

		public void Add<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId, TModel pModel)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Add(colName, pId, pModel);
		}

		public void Create<TModel>(GameTypes pGameType, EntityTypes pEntityType)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Create(colName);
		}

		public void Delete<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteById(colName, pId);
		}

		public void Delete<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteById(colName, pId);
		}

		public void DeleteAll<TModel>(GameTypes pGameType, EntityTypes pEntityType)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteAll(colName);
		}

		public void Drop<TModel>(GameTypes pGameType, EntityTypes pEntityType)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Drop(colName);
		}

		public bool Exists<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			TModel? model = _db.GetById<TModel>(colName, pId);
			return model is not null;
		}

		public bool Exists<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			TModel? model = _db.GetById<TModel>(colName, pId);
			return model is not null;
		}

		public TModel? Read<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetById<TModel>(colName, pId);
		}

		public TModel? Read<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetById<TModel>(colName, pId);
		}

		public ICollection<TModel> ReadAll<TModel>(GameTypes pGameType, EntityTypes pEntityType)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetAll<TModel>(colName);
		}

		public void Update<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId, TModel pModel)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.UpdateById(colName, pId, pModel);
		}

		public void Update<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId, TModel pModel)
		{
			string colName = Names.GetDbName(pGameType, pEntityType);
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.UpdateById(colName, pId, pModel);
		}
		#endregion
	}
}
