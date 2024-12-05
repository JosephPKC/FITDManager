using FitdConfig;
using FitdEntity.Sheets;
using FitdGateway.SheetGateway;

namespace FitdDataIO.Loader
{
	internal class SheetLoader<TSheet>(ISheetGateway pGateway) : ILoader<TSheet> where TSheet : BaseSheet
	{
		protected readonly ISheetGateway _gateway = pGateway;

		#region "ILoader"
		public TSheet? Load(ColType pColType, Guid pId)
		{
			return _gateway.Get<TSheet>(pColType, pId);
		}

		public ICollection<TSheet> LoadAll(ColType pColType)
		{
			return _gateway.GetAll<TSheet>(pColType);
		}
		#endregion
	}
}
