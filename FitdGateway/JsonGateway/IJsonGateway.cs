using FitdConfig;
using FitdEntity;

namespace FitdGateway.JsonGateway
{
	public interface IJsonGateway
	{
		void AddAll<TModel>(ColType pColType, IEnumerable<TModel> pData) where TModel : IHasId;
		void Reset<TModel>(ColType pColType) where TModel : IHasId;
	}
}
