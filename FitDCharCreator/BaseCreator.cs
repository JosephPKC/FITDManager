using FitdEntity.Sheets;
using FitdGateway;

namespace FitdCharCreator
{
    internal abstract class BaseCreator(IRefGateway pRefGateway, ISheetGateway pSheetGateway)
	{
		protected readonly IRefGateway _refGateway = pRefGateway;
		protected readonly ISheetGateway _sheetGateway = pSheetGateway;

		protected readonly BaseSheet? _sheet;

		public void CreateNewSheet()
		{
			if (_sheet == null)
			{
				return;
			}

			_sheetGateway.Add(_sheet);
		}

		public void UpdateSheet()
		{
			if (_sheet == null)
			{
				return;
			}

			_sheetGateway.Update(_sheet);
		}
	}
}
