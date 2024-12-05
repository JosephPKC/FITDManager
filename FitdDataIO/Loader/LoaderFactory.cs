using FitdEntity.Sheets;
using FitdGateway.SheetGateway;

namespace FitdDataIO.Loader
{
	public static class LoaderFactory
	{
		public static ILoader<TSheet> CreateNewSheetLoader<TSheet>(ISheetGateway pGateway) where TSheet : BaseSheet
		{
			return new SheetLoader<TSheet>(pGateway);
		}
	}
}
