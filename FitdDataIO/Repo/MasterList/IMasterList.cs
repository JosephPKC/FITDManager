using FitdEntity;

namespace FitdDataIO.Repo.MasterList
{
    public interface IMasterList<TData> : IReadOnlyCollection<TData> where TData : IHasId
    {
        IReadOnlyCollection<TData> GetAll();
        TData? GetById(Guid pId);
        bool Contains(Guid pId);
    }
}
