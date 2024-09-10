using JsonParser.Parsers;
using FitDManager.Server.DataRepo.CacheControls;

namespace FitDManager.Server.DataRepo
{
	public class JsonDataRepo(IFileParser pParser)
	{
		private static readonly string _basePath = @"DataRepo/JsonData/";
		private static readonly string _bitdGame = "BitD";

		private BitDCacheControl? _bitd = null;
		public BitDCacheControl BitD {
			get
			{
				if (_bitd != null)
				{
					return _bitd;
				}

				_bitd = new(pParser, _basePath, _bitdGame);
				return _bitd;
			}
		}
	}
}
