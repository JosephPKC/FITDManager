using LiteDbWrapper;
using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

using FitdGateway;

namespace LiteDbAdapter.Adapters.GatewayAdapter
{
    public class RefGatewayAdapterFactory
	{
		public static IRefGateway CreateNewAdapter(string pDbPath, ILoggerFactory pLogFactory)
		{
			ILiteDbWrapper wrapper = LiteDbWrapperFactory.CreateNewWrapper(pDbPath, pLogFactory);
			return new RefGatewayAdapter(wrapper, pLogFactory);
		}
	}
}
