using FitdConfig;
using FitdEntity.Sheets;

namespace FitdGateway.SheetGateway
{
	internal class SheetGateway(IDataAdapter pAdapter) : BaseGateway(pAdapter), ISheetGateway
	{
		#region "ISheetGateway"
		public void Add<TSheet>(ColType pColType, TSheet pSheet) where TSheet : BaseSheet
		{
			_adapter.Add(pColType, pSheet);
		}

		public void Clear<TSheet>(ColType pColType) where TSheet : BaseSheet
		{
			_adapter.DeleteAll<TSheet>(pColType);
		}

		public bool Contains<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet
		{
			return _adapter.Exists<TSheet>(pColType, pId);
		}

		public void Delete<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet
		{
			_adapter.Delete<TSheet>(pColType, pId);
		}

		public TSheet? Get<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet
		{
			return _adapter.Read<TSheet>(pColType, pId);
		}

		public ICollection<TSheet> GetAll<TSheet>(ColType pColType) where TSheet : BaseSheet
		{
			return _adapter.ReadAll<TSheet>(pColType);
		}

		public void Update<TSheet>(ColType pColType, TSheet pSheet) where TSheet : BaseSheet
		{
			_adapter.Update(pColType, pSheet);
		}
		#endregion
	}
}
