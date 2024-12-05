using FitdConfig;
using FitdEntity.Sheets;
using FitdGateway.SheetGateway;

namespace FitdDataIO.Saver
{
	internal class SheetSaver<TSheet>(ISheetGateway pGateway) : ISaver<TSheet> where TSheet : BaseSheet
	{
		protected readonly ISheetGateway _gateway = pGateway;

		#region "ISaver"
		public void Save(ColType pColType, TSheet pEntity)
		{
			if (_gateway.Contains<TSheet>(pColType, pEntity.Id))
			{
				_gateway.Update(pColType, pEntity);
			}
			else
			{
				_gateway.Add(pColType, pEntity);
			}
		}
		#endregion
	}
}
