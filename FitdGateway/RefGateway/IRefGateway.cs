using FitdConfig;
using FitdEntity;

namespace FitdGateway.RefGateway
{
	public interface IRefGateway
	{
		TRef? Get<TRef>(ColType pColType, Guid pId) where TRef : BaseRef;
		ICollection<TRef> GetAll<TRef>(ColType pColType) where TRef : BaseRef;
		IDictionary<Guid, TRef> GetAllAsDict<TRef>(ColType pColType) where TRef : BaseRef;
	}
}
