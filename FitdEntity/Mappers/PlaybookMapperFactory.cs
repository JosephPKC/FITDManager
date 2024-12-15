using FitdEntity.Bitd.Playbooks;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Mappers.Bitd;
using FitdEntity.Playbooks;

namespace FitdEntity.Mappers
{
	public static class PlaybookMapperFactory
	{
		public static IPlaybookMapper<BitdCharPlaybook, BitdCharPlaybookRef> CreateNewBitdCharPlaybookMapper()
		{
			return new BitdCharPlaybookMapper();
		}

		public static IPlaybookMapper<BaseCrewPlaybook, BaseCrewPlaybookRef> CreateNewBitdCrewPlaybookMapper()
		{
			return new BitdCrewPlaybookMapper();
		}
	}
}
