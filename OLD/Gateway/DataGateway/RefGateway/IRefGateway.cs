using FitdConfig;
using FitdDataEntity;

namespace DataGateway.RefGateway
{
	public interface IRefGateway
	{
		TRef? Get<TRef>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TRef : BaseRefData;
		ICollection<TRef> GetAll<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData;
		IDictionary<int, TRef> GetAllAsDict<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData;
	}
}
