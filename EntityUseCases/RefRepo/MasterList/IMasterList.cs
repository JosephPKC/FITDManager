using FitdCoreEntity;

namespace RefRepo.MasterList
{
	public interface IMasterList<TData> : IReadOnlyCollection<TData> where TData : BaseRefEntity
	{
		IReadOnlyCollection<TData> GetAll();
		TData? GetById(int pId);
		bool Contains(int pId);
	}
}
