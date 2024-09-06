using LiteDbWrapper;

using static FITDManager.Data.Db.DbSchema;

namespace FITDManager.Data.Db
{
    /// <summary>
    /// Access point to get and retrieve static data from the LiteDB.
    /// It is the wrapper that wraps the LiteDbWrapper and exposes FITD-specific queries for ease of use.
    /// It also extends the LiteDbWrapper models to create and use specific FITD-specific collection types.
    /// </summary>
    internal sealed class DataApi
    {
        private static readonly DataApi _instance = new();
        public static DataApi Instance { get { return _instance; } }

        private readonly LiteDb _db;

        static DataApi() { }

        private DataApi()
        {
            _db = new("../FitdDb.db");
        }

        public TModel? GetById<TModel>(DbCols pCol, int pId) where TModel : LiteDbModel
        {
            return _db.GetFirst<TModel>(SchemaMap[pCol].ColName, $"$._id={pId}");
        }

        public TModel? GetByName<TModel>(DbCols pCol, string pName) where TModel : LiteDbModel
        {
            return _db.GetFirst<TModel>(SchemaMap[pCol].ColName, $"$.Name={pName}");
        }

        public IEnumerable<TModel> GetAll<TModel>(DbCols pCol) where TModel : LiteDbModel
        {
            return _db.GetAll<TModel>(SchemaMap[pCol].ColName);
        }
    }
}
