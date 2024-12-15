using FitdConfig;
using FitdEntity.Sheets;
using FitdGateway.SheetGateway;

namespace FitdEntityControls.SheetSaveManager
{
	public class SheetSaveManager<TSheet>(ISheetGateway pGateway) : ISheetDeleter<TSheet>, ISheetLoader<TSheet>, ISheetSaver<TSheet> where TSheet : BaseSheet
	{
		protected readonly ISheetGateway _gateway = pGateway;

		#region "ISheetDeleter"
		public void Delete(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			_gateway.Delete<TSheet>(pGameType, pEntityType, pId);
		}
		#endregion

		#region "ISheetLoader"
		public ICollection<SheetMetaData> GetAllSheetMetaData(GameTypes pGameType, EntityTypes pEntityType)
		{
			ICollection<TSheet> sheets = _gateway.GetAll<TSheet>(pGameType, pEntityType);
			
			if (sheets.Count == 0)
			{
				return [];
			}

			List<SheetMetaData> collection = [];
			foreach (TSheet sheet in sheets)
			{
				collection.Add(SheetMetaDataBuilder.SheetMetaDataBuilder.BuildMetaData(sheet));
			}
			return collection;
		}

		public TSheet? Load(GameTypes pGameType, EntityTypes pEntityType, Guid pId)
		{
			return _gateway.Get<TSheet>(pGameType, pEntityType, pId);
		}
		#endregion

		#region "ISheetSaver"
		public void Save(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet)
		{
			if (_gateway.Contains<TSheet>(pGameType, pEntityType, pSheet.Id))
			{
				_gateway.Update(pGameType, pEntityType, pSheet);
			}
			else
			{
				_gateway.Add(pGameType, pEntityType, pSheet);
			}
		}
		#endregion
	}
}
