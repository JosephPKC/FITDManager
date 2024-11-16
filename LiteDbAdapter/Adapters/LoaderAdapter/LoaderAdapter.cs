using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

using FitdEntity;

namespace LiteDbAdapter.Adapters.LoaderAdapter
{
    /// <summary>
    /// This is an adapter between the LiteDbWrapper interface and for the Json Loader
    /// </summary>
    internal sealed class LoaderAdapter(ILiteDbWrapper pDb, ILoggerFactory pLoggerFactory) : BaseLiteDbAdapter(pDb, pLoggerFactory), ILoaderAdapter
    {
        #region "ILiteDbAdapter"

        /// <summary>
        /// Adds all models to the collection, if able.
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="pColName"></param>
        /// <param name="pModels"></param>
        public void AddAll<TModel>(string pColName, ICollection<TModel> pModels) where TModel : BaseModel
        {
            foreach (TModel model in pModels)
            {
                Add(pColName, model);
            }
        }

        /// <summary>
        /// Adds a model to the collection, if able.
        /// </summary>
        /// <typeparam name="TModel"></typeparam>
        /// <param name="pColName"></param>
        /// <param name="pModel"></param>
        public void Add<TModel>(string pColName, TModel pModel) where TModel : BaseModel
		{
            _db.Add(pColName, pModel.Id, pModel);
        }

        /// <summary>
        /// Resets the collection completely.
        /// </summary>
        /// <param name="pColName"></param>
        public void ResetCol(string pColName)
        {
            _db.DeleteAll(pColName);
            _db.Drop(pColName);
        }
        #endregion
    }
}
