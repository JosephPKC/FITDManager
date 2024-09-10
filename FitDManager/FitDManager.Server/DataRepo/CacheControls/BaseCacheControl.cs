using JsonParser.Parsers;
using FitDManager.Server.DataRepo.DataCaches;

namespace FitDManager.Server.DataRepo.CacheControls
{
	public abstract class BaseCacheControl<TCache> where TCache : BaseCache, new()
	{
		private readonly TCache _cache;
		protected readonly string _baseJsonPath;
		protected readonly string _gamePrefix;

		public BaseCacheControl(IFileParser pParser, string pBaseJsonPath, string pGamePrefix)
		{
			_baseJsonPath = pBaseJsonPath;
			_gamePrefix = pGamePrefix;
			_cache = LoadData(pParser);
		}

		protected abstract TCache LoadData(IFileParser pParser);

		protected string GetJsonFilePath(string pDataFileFolder, string pDataFileName)
		{
			return $"{_baseJsonPath}/{pDataFileFolder}/{_gamePrefix}_{pDataFileName}.json";
		}

		protected string GetJsonFilePath(string pDataFileFolder)
		{
			return GetJsonFilePath(pDataFileFolder, pDataFileFolder);
		}
	}
}
