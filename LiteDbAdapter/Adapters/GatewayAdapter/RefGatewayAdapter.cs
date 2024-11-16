using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;
using Utils.Exceptions;

using FitdConfig.Names;
using FitdEntity;
using FitdEntity.Playbooks.CharPlaybooks;
using FitdEntity.Playbooks.CrewPlaybooks;
using FitdGateway;

namespace LiteDbAdapter.Adapters.GatewayAdapter
{
    /// <summary>
    /// LiteDb adapter for Ref models, such as playbook refs and other misc ref data.
    /// </summary>
    /// <param name="pDb"></param>
    /// <param name="pLoggerFactory"></param>
    internal class RefGatewayAdapter(ILiteDbWrapper pDb, ILoggerFactory pLoggerFactory) : BaseGatewayAdapter(pDb, pLoggerFactory), IRefGateway
	{
		#region "IRefGateway"
		public void Add<TRef>(TRef pRef) where TRef : BaseRef
		{
			string colName = GetCollectionName(typeof(TRef));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.Add(colName, pRef.Id, pRef);
		}

		public void DeleteAll<TRef>() where TRef : BaseRef
		{
			string colName = GetCollectionName(typeof(TRef));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			_db.DeleteAll(colName);
		}

		public TRef? Get<TRef>(int pId) where TRef : BaseRef
		{
			string colName = GetCollectionName(typeof(TRef));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetById<TRef>(colName, pId);
		}

		public ICollection<TRef> GetAll<TRef>() where TRef : BaseRef
		{
			string colName = GetCollectionName(typeof(TRef));
			InvalidOperationExceptionExt.ThrowIfNullOrWhiteSpace("Collection Name", colName);

			return _db.GetAll<TRef>(colName);
		}
		#endregion

		protected override string GetCollectionName(Type pDataType)
		{
			return pDataType switch
			{
				Type data when data == typeof(CharPlaybookRef) => DbNames.CharPlaybookNames[GameType],
				Type data when data == typeof(CrewPlaybookRef) => DbNames.CrewPlaybookNames[GameType],
				_ => string.Empty
			};
		}
	}
}
