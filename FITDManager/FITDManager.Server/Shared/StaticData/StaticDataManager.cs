using FITDManager.Server.Models.Actions;
using FITDManager.Server.Models.Playbooks;
using JSONWrapper.Parsers;

namespace FITDManager.Server.Shared.StaticData
{
	public class StaticDataManager
	{
		private readonly IFileParser _jsonParser;

		private static readonly string _baseUrl = @"Shared/StaticData/DataFiles";
		private static readonly string _bitdPlaybookName = "Playbooks/BitD_Playbooks.json";
		private static readonly string _savPlaybookName = "Playbooks/SaV_Playbooks.json";

		public StaticDataStore Data { get; private set; }

		public StaticDataManager(IFileParser pParser)
		{
			// Needs to load and parse out json files and store them for access.
			_jsonParser = pParser;
			Data = GetStaticData();
		}

		private StaticDataStore GetStaticData()
		{
			return new()
			{
				BitDPlaybooks = _jsonParser.DeserializeArrayFromFile<PlaybookModel<BitDActionTypes>>($"{_baseUrl}/{_bitdPlaybookName}"),
				SavPlaybooks = _jsonParser.DeserializeArrayFromFile<PlaybookModel<SaVActionTypes>>($"{_baseUrl}/{_savPlaybookName}")
			};
		}
	}
}
