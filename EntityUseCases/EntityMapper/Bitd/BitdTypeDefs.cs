using FitdCoreEntity.Bitd;
using FitdDataEntity.Bitd;

namespace EntityMapper.Bitd
{
	public interface IBitdCharPlaybookMapper : IMapper<BitdCharPlaybookData, BitdCharPlaybookEntity> { }
	public interface IBitdCrewPlaybookMapper : IMapper<BitdCrewPlaybookData, BitdCrewPlaybookEntity> { }

	public interface IBitdCharSheetMapper : IMapper<BitdCharSheetData, BitdCharSheetEntity> { }
	public interface IBitdCrewSheetMapper : IMapper<BitdCrewSheetData, BitdCrewSheetEntity> { }
}