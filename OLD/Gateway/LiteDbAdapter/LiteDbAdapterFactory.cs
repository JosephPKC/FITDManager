using LiteDbWrapper.Wrappers;
using LiteDbWrapper;
using LogWrapper.Loggers;

using DataGateway;

namespace LiteDbAdapter
{
	public static class LiteDbAdapterFactory
	{
		public static IDataAdapter CreateNewAdapter(string pDbPath, ILoggerFactory pLogFactory)
		{
			ILiteDbWrapper wrapper = LiteDbWrapperFactory.CreateNewWrapper(pDbPath, pLogFactory);
			return new LiteDbAdapter(wrapper);
		}
	}
}
