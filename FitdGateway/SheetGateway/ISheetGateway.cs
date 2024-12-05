using FitdConfig;
using FitdEntity.Sheets;

namespace FitdGateway.SheetGateway
{
	public interface ISheetGateway
	{
		void Add<TSheet>(ColType pColType, TSheet pSheet) where TSheet : BaseSheet;
		void Clear<TSheet>(ColType pColType) where TSheet : BaseSheet;
		bool Contains<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet;
		void Delete<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet;
		TSheet? Get<TSheet>(ColType pColType, Guid pId) where TSheet : BaseSheet;
		ICollection<TSheet> GetAll<TSheet>(ColType pColType) where TSheet : BaseSheet;
		void Update<TSheet>(ColType pColType, TSheet pSheet) where TSheet : BaseSheet;
	}
}
