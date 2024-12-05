﻿using FitdGateway.JsonGateway;
using FitdGateway.RefGateway;
using FitdGateway.SheetGateway;

namespace FitdGateway
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
