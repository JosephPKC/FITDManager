using FitdConfig;
using FitdEntity;

namespace FitdGateway
{
	/// <summary>
	/// Full CRUD suite for data.
	/// </summary>
	public interface IDataAdapter
	{
		void Add<TData>(ColType pColType, TData pData) where TData : IHasId;
		void AddAll<TData>(ColType pColType, IEnumerable<TData> pEntities) where TData : IHasId;
		void Create<TData>(ColType pColType) where TData : IHasId;

		TData? Read<TData>(ColType pColType, Guid pId) where TData : IHasId;
		ICollection<TData> ReadAll<TData>(ColType pColType) where TData : IHasId;

		void Update<TData>(ColType pColType, TData pData) where TData : IHasId;
		void UpdateAll<TData>(ColType pColType, IEnumerable<TData> pEntities) where TData : IHasId;

		void Delete<TData>(ColType pColType, Guid pId) where TData: IHasId;
		void DeleteAll<TData>(ColType pColType) where TData : IHasId;
		void Drop<TData>(ColType pColType) where TData : IHasId;

		bool Exists<TData>(ColType pColType, Guid pId) where TData : IHasId;
	}
}