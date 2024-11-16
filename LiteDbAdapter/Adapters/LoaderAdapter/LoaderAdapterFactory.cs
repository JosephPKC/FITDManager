using LiteDbWrapper;
using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

namespace LiteDbAdapter.Adapters.LoaderAdapter
{
    public static class LoaderAdapterFactory
    {
        public static ILoaderAdapter CreateNewAdapter(string pDbPath, ILoggerFactory pLogFactory)
        {
            ILiteDbWrapper wrapper = LiteDbWrapperFactory.CreateNewWrapper(pDbPath, pLogFactory);
			return new LoaderAdapter(wrapper, pLogFactory);
		}
	}
}