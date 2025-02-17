using FitdConfig;
using FitdDataEntity.Sheets;

namespace DataGateway.SheetGateway
{
	internal class SheetGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), ISheetGateway
	{
		#region "ISheetGateway"
		public void Add<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheetData
		{
			_adapter.Add(pGameType, pEntityType, pSheet.Id, pSheet);
		}

		public void Clear<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheetData
		{
			_adapter.DeleteAll<TSheet>(pGameType, pEntityType);
		}

		public bool Contains<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData
		{
			return _adapter.Exists<TSheet>(pGameType, pEntityType, pId);
		}

		public void Delete<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData
		{
			_adapter.Delete<TSheet>(pGameType, pEntityType, pId);
		}

		public TSheet? Get<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData
		{
			return _adapter.Read<TSheet>(pGameType, pEntityType, pId);
		}

		public ICollection<TSheet> GetAll<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheetData
		{
			return _adapter.ReadAll<TSheet>(pGameType, pEntityType);
		}

		public void Update<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheetData
		{
			_adapter.Update(pGameType, pEntityType, pSheet.Id, pSheet);
		}
		#endregion
	}
}
