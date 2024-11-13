using LiteDbAdapter.DbModels;

namespace LiteDbAdapter
{
	public interface ILiteDbAdapter
	{
		ICollection<TModel> GetAll<TModel>(string pColName) where TModel : BaseDbModel;
		TModel? GetById<TModel>(string pColName, int pId) where TModel : BaseDbModel;
		void AddAll<TModel>(string pColName, ICollection<TModel> pModels) where TModel : BaseDbModel;
		void Add<TModel>(string pColName, TModel pModel) where TModel : BaseDbModel;
		void UpdateById<TModel>(string pColName, int pId, TModel pModel) where TModel : BaseDbModel;
		void ResetCol(string pColname);
	}
}
