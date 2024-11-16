using FitdEntity;

namespace FitdGateway
{
    /// <summary>
    /// Adapters to the Ref db need to implement this.
    /// </summary>
    public interface IRefGateway
    {
        void Add<TRef>(TRef pRef) where TRef : BaseRef;
        void DeleteAll<TRef>() where TRef : BaseRef;
        TRef? Get<TRef>(int pId) where TRef : BaseRef;
        ICollection<TRef> GetAll<TRef>() where TRef : BaseRef;
    }
}
