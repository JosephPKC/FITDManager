using DataGateway.RefGateway;
using EntityMapper.Bitd;
using FitdConfig;
using FitdCoreEntity.Bitd;
using FitdDataEntity.Bitd;

namespace RefRepo
{
	// Class Type Defs for very long generic types.
	public interface IBitdRepo : IRepo<BitdCharPlaybookData, BitdCrewPlaybookData, BitdCharPlaybookEntity, BitdCrewPlaybookEntity> { }

	internal class BitdRepo(IRefGateway pGateway, IBitdCharPlaybookMapper pCharMapper, IBitdCrewPlaybookMapper pCrewMapper)
		: Repo<BitdCharPlaybookData, BitdCrewPlaybookData, BitdCharPlaybookEntity, BitdCrewPlaybookEntity>(pGateway, GameTypes.BitD, pCharMapper, pCrewMapper), IBitdRepo
	{ }
}
