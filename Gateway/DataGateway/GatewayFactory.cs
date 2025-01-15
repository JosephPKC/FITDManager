using DataGateway.JsonGateway;
using DataGateway.RefGateway;
using DataGateway.SheetGateway;

namespace DataGateway
{
	public static class GatewayFactory
	{
		public static IJsonGateway CreateNewJsonGateway(IDataAdapter pAdapter)
		{
			return new JsonGateway.JsonGateway(pAdapter);
		}

		public static IRefGateway CreateNewRefGateway(IDataAdapter pAdapter)
		{
			return new RefGateway.RefGateway(pAdapter);
		}

		public static ISheetGateway CreateNewSheetGateway(IDataAdapter pAdapter)
		{
			return new SheetGateway.SheetGateway(pAdapter);
		}
	}
}
