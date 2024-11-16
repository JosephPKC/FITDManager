using LiteDbWrapper.Wrappers;
using LogWrapper.Loggers;

namespace LiteDbAdapter.Adapters
{
	/// <summary>
	/// The base adapter.
	/// </summary>
	/// <param name="pDb"></param>
	/// <param name="pLoggerFactory"></param>
	internal abstract class BaseLiteDbAdapter(ILiteDbWrapper pDb, ILoggerFactory pLoggerFactory)
	{
		protected readonly ILiteDbWrapper _db = pDb;
		protected readonly ILogger log = pLoggerFactory.CreateNewLogger(typeof(BaseLiteDbAdapter));
	}
}
