using LiteDbWrapper;
using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;
using LogWrapper.Loggers.Log4Net.ColorConsole;

namespace LiteDbAdapter
{
	public static class LiteDbAdapterFactory
	{
		public static ILiteDbAdapter CreateNewAdapter(string pDbPath)
		{
			ColorConsoleLoggerFactory logFactory = new();
			return CreateNewAdapter(pDbPath, logFactory);
		}

		public static ILiteDbAdapter CreateNewAdapter(string pDbPath, ILoggerFactory pLogFactory)
		{
			LiteDbWrapperFactory factory = new();
			ILiteDbWrapper wrapper = factory.CreateNewWrapper(pDbPath, pLogFactory);
			return CreateNewAdapter(wrapper);
		}

		public static ILiteDbAdapter CreateNewAdapter(ILiteDbWrapper pWrapper)
		{
			return new LiteDbAdapter(pWrapper);
		}
	}
}