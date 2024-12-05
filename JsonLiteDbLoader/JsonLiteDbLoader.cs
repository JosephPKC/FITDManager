using JsonParser.Parsers;
using LogWrapper.Loggers;

using FitdConfig;
using FitdConfig.Configs;
using FitdEntity;
using FitdEntity.Bitd.Playbooks;
using FitdGateway.JsonGateway;

namespace JsonLiteDbLoader
{
    /// <summary>
    /// Loads json data files and pushes them to a LiteDb instance.
    /// </summary>
    public sealed class JsonLiteDbLoader(IJsonGateway pGateway, IFileParser pJson, ILoggerFactory pLoggerFactory)
	{
		private readonly IJsonGateway _gateway = pGateway;
		private readonly IFileParser _json = pJson;
		private readonly ILogger log = pLoggerFactory.CreateNewLogger(typeof(JsonLiteDbLoader));

		public void LoadAllData(string pBasePath)
		{
			CleanUp();
			LoadJsonData(pBasePath);
		}

		private void CleanUp()
		{
			CleanUpBITD();
		}

		private void LoadJsonData(string pBasePath)
		{
			LoadBITD(pBasePath);
		}

		#region "Common"

		#endregion

		#region "BITD"
		private void CleanUpBITD()
		{
			log.Info("BEGIN: Clean up BITD tables.");

			_gateway.Reset<BitdCharPlaybook>(new ColType(EntityTypes.CharPlaybook, GameTypes.BitD));

			log.Info("END: Clean up BITD tables.");
		}

		private void LoadBITD(string pBasePath)
		{
			log.Info("BEGIN: Load BITD data.");

			LoadJsonDataArray<BitdCharPlaybook>(pBasePath, EntityTypes.CharPlaybook, GameTypes.BitD);

			log.Info("END: Load BITD data.");
		}
		#endregion

		private void LoadJsonDataArray<TModel>(string pBaseFilePath, EntityTypes pEntityType, GameTypes pGameType) where TModel : IHasId
		{
			ColType colType = new(pEntityType, pGameType);
			ICollection<TModel> jsonData = _json.DeserializeArrayFromFile<TModel>($"{pBaseFilePath}{Names.JsonNames[colType]}");
			_gateway.AddAll(colType, jsonData);
		}
	}
}
