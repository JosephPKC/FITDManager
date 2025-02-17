using FitdConfig;
using FitdEntityCommon;

namespace SheetBuilder
{
	public interface ISheetBuilder
	{
		void CreateBlankSheet();
		void Reset();
		void SaveSheet();
	}
}
