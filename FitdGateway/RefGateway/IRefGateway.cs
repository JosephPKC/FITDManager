using FitdConfig;
using FitdEntity;

namespace FitdGateway.RefGateway
{
	public interface IRefGateway
	{
		TRef? Get<TRef>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TRef : BaseRef;
		ICollection<TRef> GetAll<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRef;
		IDictionary<int, TRef> GetAllAsDict<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRef;
	}
}
