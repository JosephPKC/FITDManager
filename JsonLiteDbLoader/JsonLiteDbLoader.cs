using JsonParser.Parsers;
using LogWrapper.Loggers;

using LiteDbAdapter;
using LiteDbAdapter.DbModels;
using LiteDbAdapter.DbModels.Playbooks;

namespace JsonLiteDbLoader
{
    /// <summary>
    /// Loads json data files and pushes them to a LiteDb instance.
    /// </summary>
    public sealed class JsonLiteDbLoader(ILiteDbAdapter pDb, IFileParser pJson, ILoggerFactory pLoggerFactory)
	{
		private readonly ILiteDbAdapter _db = pDb;
		private readonly IFileParser _json = pJson;
		private readonly ILogger log = pLoggerFactory.CreateNewLogger(typeof(JsonLiteDbLoader));

		/* File & Collection Names */
		private static readonly string _playbookJsonPath = "Playbooks/";

		private static readonly string _bitdCharPlaybooksName = "BITD_Char_Playbooks";
		private static readonly string _bitdCrewPlaybooksName = "BITD_Crew_Playbooks";
		private static readonly string _savCharPlaybooksName = "SAV_Char_Playbooks";
		private static readonly string _savCrewPlaybooksName = "SAV_Crew_Playbooks";

		private static readonly ICollection<string> _allNames = [_bitdCharPlaybooksName, _bitdCrewPlaybooksName, _savCharPlaybooksName, _savCrewPlaybooksName];

		public void LoadAllData(string pBasePath)
		{
			CleanUp();
			LoadJsonData(pBasePath);
		}

		private void CleanUp()
		{
			log.Info("BEGIN: Cleaning up existing collections.");
			foreach (string colName in _allNames)
			{
				try
				{
					log.Info($"Reseting collection {colName}.");
					_db.ResetCol(colName);
				}
				catch (Exception ex)
				{
					log.Error($"Error: {ex}.");
					throw;
				}
			}
			log.Info("END: Cleaning up existing collections.");
		}

		private void LoadJsonData(string pBasePath)
		{
			LoadPlaybookData(pBasePath);
			// Other Stuff Here
		}

		private void LoadPlaybookData(string pBasePath)
		{
			string baseFilePath = $"{pBasePath}{_playbookJsonPath}";

			// BITD
			// Char Playbooks
			LoadJsonDataArray<CharPlaybookDbModel>(baseFilePath, $"{_bitdCharPlaybooksName}.json", _bitdCharPlaybooksName);

			// Crew Playbooks
			LoadJsonDataArray<CrewPlaybookDbModel>(baseFilePath, $"{_bitdCrewPlaybooksName}.json", _bitdCrewPlaybooksName);
		}

		private void LoadJsonDataArray<TModel>(string pBaseFilePath, string pFileName, string pColName) where TModel : BaseDbModel
		{
			log.Info($"BEGIN: Load {pBaseFilePath}{pFileName} to Collection {pColName}.");
			ICollection<TModel> jsonData = _json.DeserializeArrayFromFile<TModel>($"{pBaseFilePath}{pFileName}");
			_db.AddAll(pColName, jsonData);
			log.Info($"END: Load {pBaseFilePath}{pFileName} to Collection {pColName}.");
		}
	}
}
