using FitdConfig;
using FitdDataEntity.Sheets;

namespace DataGateway.SheetGateway
{
	public interface ISheetGateway
	{
		void Add<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheetData;
		void Clear<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheetData;
		bool Contains<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData;
		void Delete<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData;
		TSheet? Get<TSheet>(GameTypes pGameType, EntityTypes pEntityType, Guid pId) where TSheet : BaseSheetData;
		ICollection<TSheet> GetAll<TSheet>(GameTypes pGameType, EntityTypes pEntityType) where TSheet : BaseSheetData;
		void Update<TSheet>(GameTypes pGameType, EntityTypes pEntityType, TSheet pSheet) where TSheet : BaseSheetData;
	}
}
