using FitdConfig;
using FitdEntity;

namespace FitdGateway.JsonGateway
{
	public interface IJsonGateway
	{
		void AddAll<TRef>(GameTypes pGameType, EntityTypes pEntityType, IEnumerable<TRef> pModels) where TRef : BaseRef;
		void Reset<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRef;
	}
}
