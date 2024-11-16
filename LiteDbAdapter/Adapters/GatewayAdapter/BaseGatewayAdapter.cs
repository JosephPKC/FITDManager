using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

using FitdConfig;

namespace LiteDbAdapter.Adapters.GatewayAdapter
{
	internal abstract class BaseGatewayAdapter(ILiteDbWrapper pDb, ILoggerFactory pLoggerFactory) : BaseLiteDbAdapter(pDb, pLoggerFactory)
	{
		public GameType.GameTypes GameType { get; set; } = FitdConfig.GameType.GameTypes.BitD;
		protected abstract string GetCollectionName(Type pDataType);
	}
}
