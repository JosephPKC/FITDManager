using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;
using Utils.Exceptions;

using FitdConfig.Names;
using FitdEntity.Sheets;
using FitdGateway;

namespace LiteDbAdapter.Adapters.GatewayAdapter
{
    internal class SheetGatewayAdapter(ILiteDbWrapper pDb, ILoggerFactory pLoggerFactory) : BaseGatewayAdapter(pDb, pLoggerFactory), ISheetGateway
	{
		#region "ISheetGateway"
		public void Add<TSheet>(TSheet pSheet) where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Add(colName, pSheet.Id, pSheet);
		}

		public void Delete<TSheet>(int pId) where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteById(colName, pId);
		}

		public void DeleteAll<TSheet>() where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteAll(colName);
		}

		public TSheet? Get<TSheet>(int pId) where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetById<TSheet>(colName, pId);
		}

		public ICollection<TSheet> GetAll<TSheet>() where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetAll<TSheet>(colName);
		}

		public void Update<TSheet>(TSheet pSheet) where TSheet : BaseSheet
		{
			string colName = GetCollectionName(typeof(TSheet));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.UpdateById(colName, pSheet.Id, pSheet);
		}
		#endregion

		protected override string GetCollectionName(Type pDataType)
		{
			return pDataType switch
			{
				Type data when data == typeof(CharSheet) => DbNames.CharSheetNames[GameType],
				_ => string.Empty
			};
		}
	}
}
