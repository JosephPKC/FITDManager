using FitdEntity;

namespace LiteDbAdapter.Adapters.LoaderAdapter
{
    public interface ILoaderAdapter
    {
        void AddAll<TModel>(string pColName, ICollection<TModel> pModels) where TModel : BaseModel;
        void Add<TModel>(string pColName, TModel pModel) where TModel : BaseModel;
        void ResetCol(string pColName);
    }
}
