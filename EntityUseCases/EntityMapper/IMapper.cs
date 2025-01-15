using FitdCoreEntity;
using FitdDataEntity;

namespace EntityMapper
{
	public interface IMapper<TData, TEntity> where TData : BaseDataEntity where TEntity : BaseCoreEntity
	{
		TData MapDataFromEntity(TEntity pEntity);
		TEntity MapEntityFromData(TData pData);
	}
}
