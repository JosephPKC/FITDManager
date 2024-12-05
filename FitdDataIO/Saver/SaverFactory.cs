using FitdEntity.Sheets;
using FitdGateway.SheetGateway;

namespace FitdDataIO.Saver
{
	public static class SaverFactory
	{
		public static ISaver<TSheet> CreateNewSheetSaver<TSheet>(ISheetGateway pGateway) where TSheet : BaseSheet
		{
			return new SheetSaver<TSheet>(pGateway);
		}
	}
}
