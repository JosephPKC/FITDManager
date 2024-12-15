using FitdConfig;
using FitdEntity.Sheets;

namespace FitdGateway.SheetGateway
{
	public interface ISheetGateway
	{
		void Add<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheet;
		void Clear<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheet;
		bool Contains<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheet;
		void Delete<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheet;
		TSheet? Get<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheet;
		ICollection<TSheet> GetAll<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheet;
		void Update<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheet;
	}
}
