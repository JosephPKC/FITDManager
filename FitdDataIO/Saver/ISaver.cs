using FitdConfig;
using FitdEntity;

namespace FitdDataIO.Saver
{
	public interface ISaver<TEntity> where TEntity : BaseEntity
	{
		void Save(ColType pColType, TEntity pEntity);
	}
}
