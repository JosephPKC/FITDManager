using FitdConfig;

namespace DataGateway
{
	/// <summary>
	/// Full CRUD suite for data.
	/// </summary>
	public interface IDataAdapter
	{
		void Add<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId, TModel pModel);
		void Add<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId, TModel pModel);
		void Create<TModel>(GameTypes pGameType, EntityTypes pEntityType);
		void Delete<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
		void Delete<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId);
		void DeleteAll<TModel>(GameTypes pGameType, EntityTypes pEntityType);
		void Drop<TModel>(GameTypes pGameType, EntityTypes pEntityType);
		bool Exists<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
		bool Exists<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId);
		TModel? Read<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId);
		TModel? Read<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId);
		ICollection<TModel> ReadAll<TModel>(GameTypes pGameType, EntityTypes pEntityType);
		void Update<TModel>(GameTypes pGameType, EntityTypes pEntityType, Guid pId, TModel pModel);
		void Update<TModel>(GameTypes pGameType, EntityTypes pEntityType, int pId, TModel pModel);
	}
}