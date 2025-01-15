using FitdConfig;
using FitdDataEntity;

namespace DataGateway.RefGateway
{
	internal class RefGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), IRefGateway
	{
		#region "IRefGateway"
		public TRef? Get<TRef>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TRef : BaseRefData
		{
			return _adapter.Read<TRef>(pGameType, pEntityType, pId);
		}

		public ICollection<TRef> GetAll<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData
		{
			return _adapter.ReadAll<TRef>(pGameType, pEntityType);
		}

		public IDictionary<int, TRef> GetAllAsDict<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData
		{
			ICollection<TRef> allCol = GetAll<TRef>(pGameType, pEntityType);

			return allCol.ToDictionary(x => x.Id, x => x);
		}
		#endregion
	}
}
