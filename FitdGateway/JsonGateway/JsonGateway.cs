using FitdConfig;
using FitdEntity;

namespace FitdGateway.JsonGateway
{
	internal class JsonGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), IJsonGateway
	{
		#region "IJsonGateway"
		/// <summary>
		/// Adds all of the data models to the collection.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pGameType"></param>
		/// <param name="pData"></param>
		public void AddAll<TModel>(ColType pColType, IEnumerable<TModel> pData) where TModel : IHasId
		{
			_adapter.AddAll(pColType, pData);
		}

		/// <summary>
		/// Resets the collection: Deletes all items in the collection, drops the collection, and then recreates the empty collection.
		/// </summary>
		/// <typeparam name="TModel"></typeparam>
		/// <param name="pGameType"></param>
		public void Reset<TModel>(ColType pColType) where TModel : IHasId
		{
			_adapter.DeleteAll<TModel>(pColType);
			_adapter.Drop<TModel>(pColType);
			_adapter.Create<TModel>(pColType);
		}
		#endregion
	}
}
