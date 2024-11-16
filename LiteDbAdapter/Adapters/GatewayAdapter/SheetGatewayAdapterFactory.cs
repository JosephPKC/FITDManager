using LiteDbWrapper;
using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

using FitdGateway;

namespace LiteDbAdapter.Adapters.GatewayAdapter
{
    public class SheetGatewayAdapterFactory
	{
		public static ISheetGateway CreateNewAdapter(string pDbPath, ILoggerFactory pLogFactory)
		{
			ILiteDbWrapper wrapper = LiteDbWrapperFactory.CreateNewWrapper(pDbPath, pLogFactory);
			return new SheetGatewayAdapter(wrapper, pLogFactory);
		}
	}
}
