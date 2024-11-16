using JsonParser.Parsers;
using LogWrapper.Loggers;

using FitdConfig.Names;
using FitdEntity;
using LiteDbAdapter.Adapters.LoaderAdapter;
using FitdEntity.Playbooks.CharPlaybooks;
using FitdEntity.Playbooks.CrewPlaybooks;

namespace JsonLiteDbLoader
{
    /// <summary>
    /// Loads json data files and pushes them to a LiteDb instance.
    /// </summary>
    public sealed class JsonLiteDbLoader(ILoaderAdapter pDb, IFileParser pJson, ILoggerFactory pLoggerFactory)
	{
		private readonly ILoaderAdapter _db = pDb;
		private readonly IFileParser _json = pJson;
		private readonly ILogger log = pLoggerFactory.CreateNewLogger(typeof(JsonLiteDbLoader));

		public void LoadAllData(string pBasePath)
		{
			CleanUp();
			LoadJsonData(pBasePath);
		}

		private void CleanUp()
		{
			log.Info("BEGIN: Cleaning up existing collections.");
			foreach (string colName in DbNames.AllRefNames)
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
			string baseFilePath = $"{pBasePath}{JsonNames.PlaybookJsonPath}";

			// BITD
			LoadJsonDataArray<BitdCharPlaybookRef>(baseFilePath, $"{JsonNames.CharPlaybookNames[FitdConfig.GameType.GameTypes.BitD]}", DbNames.CharPlaybookNames[FitdConfig.GameType.GameTypes.BitD]);
			//LoadJsonDataArray<CrewPlaybookRef>(baseFilePath, $"{JsonNames.CrewPlaybookNames[FitdConfig.GameType.GameTypes.BitD]}", DbNames.CrewPlaybookNames[FitdConfig.GameType.GameTypes.BitD]);

			//// SAV
			//LoadJsonDataArray<BitdCharPlaybookRef>(baseFilePath, $"{JsonNames.CharPlaybookNames[FitdConfig.GameType.GameTypes.SaV]}", DbNames.CharPlaybookNames[FitdConfig.GameType.GameTypes.SaV]);
			//LoadJsonDataArray<BitdCharPlaybookRef>(baseFilePath, $"{JsonNames.CrewPlaybookNames[FitdConfig.GameType.GameTypes.SaV]}", DbNames.CrewPlaybookNames[FitdConfig.GameType.GameTypes.SaV]);
		}

		private void LoadJsonDataArray<TModel>(string pBaseFilePath, string pFileName, string pColName) where TModel : BaseModel
		{
			log.Info($"BEGIN: Load {pBaseFilePath}{pFileName} to Collection {pColName}.");
			ICollection<TModel> jsonData = _json.DeserializeArrayFromFile<TModel>($"{pBaseFilePath}{pFileName}");
			_db.AddAll(pColName, jsonData);
			log.Info($"END: Load {pBaseFilePath}{pFileName} to Collection {pColName}.");
		}
	}
}
