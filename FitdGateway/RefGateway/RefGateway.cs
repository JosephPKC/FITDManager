using FitdConfig;
using FitdEntity;

namespace FitdGateway.RefGateway
{
	internal class RefGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), IRefGateway
	{
		#region "IRefGateway"
		public TRef? Get<TRef>(ColType pColType, Guid pId) where TRef : BaseRef
		{
			return _adapter.Read<TRef>(pColType, pId);
		}

		public ICollection<TRef> GetAll<TRef>(ColType pColType) where TRef : BaseRef
		{
			return _adapter.ReadAll<TRef>(pColType);
		}

		public IDictionary<Guid, TRef> GetAllAsDict<TRef>(ColType pColType) where TRef : BaseRef
		{
			ICollection<TRef> allCol = GetAll<TRef>(pColType);

			return allCol.ToDictionary(x => x.Id, x => x);
		}
		#endregion
	}
}
