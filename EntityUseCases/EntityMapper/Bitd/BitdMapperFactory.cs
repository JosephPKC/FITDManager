namespace EntityMapper.Bitd
{
	public static class BitdMapperFactory
	{
		public static IBitdCharPlaybookMapper CreateNewCharPlaybookMapper()
		{
			return new BitdCharPlaybookMapper();
		}

		public static IBitdCrewPlaybookMapper CreateNewCrewPlaybookMapper()
		{
			throw new NotImplementedException();
		}

		public static IBitdCharSheetMapper CreateNewCharSheetMapper()
		{
			return new BitdCharSheetMapper();
		}

		public static IBitdCrewSheetMapper CreateNewCrewSheetMapper()
		{
			throw new NotImplementedException();
		}
	}
}
