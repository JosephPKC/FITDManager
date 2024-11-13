using LiteDbWrapper.Wrappers;

using LiteDbAdapter.DbModels;

namespace LiteDbAdapter
{
	/// <summary>
	/// This is an adapter between the LiteDbWrapper interface and for the FitDManager program.
	/// This will be used by any module in the FitDManager family that needs to use the LiteDb wraper.
	/// </summary>
	public sealed class LiteDbAdapter(ILiteDbWrapper pDb) : ILiteDbAdapter
	{
		private readonly ILiteDbWrapper _db = pDb;

		#region "ILiteDbAdapter"
		/// <summary>
		/// Gets all models from the collection.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pColName"></param>
		/// <returns></returns>
		public ICollection<TModel> GetAll<TModel>(string pColName) where TModel : BaseDbModel
		{
			return _db.GetAll<TModel>(pColName);
		}

		/// <summary>
		/// Gets a specific model from the collection via id.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pColName"></param>
		/// <param name="pId"></param>
		/// <returns></returns>
		public TModel? GetById<TModel>(string pColName, int pId) where TModel : BaseDbModel
		{
			return _db.GetById<TModel>(pColName, pId);
		}

		/// <summary>
		/// Adds all models to the collection, if able.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pColName"></param>
		/// <param name="pModels"></param>
		public void AddAll<TModel>(string pColName, ICollection<TModel> pModels) where TModel : BaseDbModel
		{
			_db.AddAll(pColName, pModels);
		}

		/// <summary>
		/// Adds a model to the collection, if able.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pColName"></param>
		/// <param name="pModel"></param>
		public void Add<TModel>(string pColName, TModel pModel) where TModel : BaseDbModel
		{
			_db.Add(pColName, pModel);
		}

		/// <summary>
		/// Updates an existing model of the collection via id, if able.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pColName"></param>
		/// <param name="pId"></param>
		/// <param name="pModel"></param>
		public void UpdateById<TModel>(string pColName, int pId, TModel pModel) where TModel : BaseDbModel
		{
			_db.UpdateById(pColName, pId, pModel);
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
