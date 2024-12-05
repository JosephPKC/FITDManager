using FitdConfig;
using FitdEntity;

namespace FitdDataIO.Loader
{
	public interface ILoader<TEntity> where TEntity : BaseEntity
	{
		TEntity? Load(ColType pColType, Guid pId);
		ICollection<TEntity> LoadAll(ColType pColType);
	}
}
