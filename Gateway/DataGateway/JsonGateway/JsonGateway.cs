using FitdConfig;
using FitdDataEntity;

namespace DataGateway.JsonGateway
{
	internal class JsonGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), IJsonGateway
	{
		#region "IJsonGateway"
		/// <summary>
		/// Adds all of the data models to the collection.
		/// </summary>
		/// <typeparam name="TRef"></typeparam>
		/// <param name="pGameType"></param>
		/// <param name="pEntityType"></param>
		/// <param name="pModels"></param>
		public void AddAll<TRef>(GameTypes pGameType, EntityTypes pEntityType, IEnumerable<TRef> pModels) where TRef : BaseRefData
		{
			foreach (TRef model in pModels)
			{
				_adapter.Add(pGameType, pEntityType, model.Id, model);
			}
		}

		/// <summary>
		/// Resets the collection: Deletes all items in the collection, drops the collection, and then recreates the empty collection.
		/// </summary>
		/// <typeparam name="TRef"></typeparam>
		/// <param name="pGameType"></param>
		/// <param name="pEntityType"></param>
		public void Reset<TRef>(GameTypes pGameType, EntityTypes pEntityType) where TRef : BaseRefData
		{
			_adapter.DeleteAll<TRef>(pGameType, pEntityType);
			_adapter.Drop<TRef>(pGameType, pEntityType);
			_adapter.Create<TRef>(pGameType, pEntityType);
		}
		#endregion
	}
}
