using FitdConfig;
using FitdDataEntity;

namespace DataGateway.JsonGateway
{
	public interface IJsonGateway
	{
		void AddAll<TRef>(GameTypes pGameType, EntityTypes pEntityType, IEnumerable<TRef> pModels) where TRef : BaseRefData;
		void Reset<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData;
	}
}
