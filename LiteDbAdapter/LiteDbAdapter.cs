using LiteDbWrapper.Wrappers;
using Utils.Exceptions;

using FitdConfig;
using FitdConfig.Configs;
using FitdEntity;
using FitdGateway;

namespace LiteDbAdapter
{
	internal sealed class LiteDbAdapter(ILiteDbWrapper pDb) : IDataAdapter
	{
		private readonly ILiteDbWrapper _db = pDb;

		#region "IDataAdapter"
		public void Add<TData>(ColType pColType, TData pData) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Add(colName, pData.Id, pData);
		}

		public void AddAll<TData>(ColType pColType, IEnumerable<TData> pEntities) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			foreach (TData entity in pEntities)
			{
				_db.Add(colName, entity.Id, entity);
			}
		}

		public void Create<TData>(ColType pColType) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Create(colName);
		}

		public void Delete<TData>(ColType pColType, Guid pId) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteById(colName, pId);
		}

		public void DeleteAll<TData>(ColType pColType) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteAll(colName);
		}

		public TData? Read<TData>(ColType pColType, Guid pId) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetById<TData>(colName, pId);
		}

		public ICollection<TData> ReadAll<TData>(ColType pColType) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetAll<TData>(colName);
		}

		public void Update<TData>(ColType pColType, TData pData) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.UpdateById(colName, pData.Id, pData);
		}

		public void UpdateAll<TData>(ColType pColType, IEnumerable<TData> pEntities) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			foreach (TData entity in pEntities)
			{
				_db.UpdateById(colName, entity.Id, entity);
			}
		}

		public void Drop<TData>(ColType pColType) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Drop(colName);
		}

		public bool Exists<TData>(ColType pColType, Guid pId) where TData : IHasId
		{
			string colName = Names.DbNames[pColType];
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			TData? data = _db.GetById<TData>(colName, pId);
			return data is null;
		}
		#endregion
	}
}
