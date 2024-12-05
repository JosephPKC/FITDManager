using FileIOWrapper.FileSystemIO;
using JsonParser;
using JsonParser.Parsers;
using LogWrapper.Loggers.Log4Net.ColorConsole;

using FitdGateway;
using FitdGateway.JsonGateway;
using LiteDbAdapter;

namespace JsonLiteDbLoader
{
    public static class Program
	{
		public static void Main()
		{
			string dbPath = Path.Combine(Environment.CurrentDirectory, @"..\..\..\..\Data\DbData", "FitdRefDb.db");
			string jsonBasePath = Path.Combine(Environment.CurrentDirectory, @"..\..\..\..\Data\JsonData\");
			ColorConsoleLoggerFactory logFactory = new();

			IDataAdapter adapter = LiteDbAdapterFactory.CreateNewAdapter(dbPath, logFactory);
			IJsonGateway gateway = GatewayFactory.CreateNewJsonGateway(adapter);
			IFileParser parser = JsonParserFactory.CreateTextJsonFileParser(new FileSystemIOFactory().CreateNewFileIO());

			JsonLiteDbLoader loader = new(gateway, parser, logFactory);
			loader.LoadAllData(jsonBasePath);
		}
	}
}