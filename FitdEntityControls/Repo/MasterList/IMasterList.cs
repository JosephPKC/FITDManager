using FitdEntity;

namespace FitdEntityControls.Repo.MasterList
{
	public interface IMasterList<TData> : IReadOnlyCollection<TData> where TData : BaseRef
	{
		IReadOnlyCollection<TData> GetAll();
		TData? GetById(int pId);
		bool Contains(int pId);
	}
}
