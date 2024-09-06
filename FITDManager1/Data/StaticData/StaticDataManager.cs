using FITDManager.Data.Models.BitD;

namespace FITDManager.Data.StaticData
{
	/// <summary>
	/// It will open and load data from json files and cache them.
	/// Anything that needs access to static data will get it through this manager.
	/// </summary>
	public sealed class StaticDataManager
	{
		private static readonly StaticDataManager _instance = new();
		public static StaticDataManager Instance { get { return _instance; } }

		#region "Constant Fields"
		private static readonly string _sharedName = "_Shared";
		#endregion

		#region "Static Data Cache Fields"
		public IEnumerable<BitdPlaybookModel> BitdPlaybooks { get; private set; }
		#endregion

		static StaticDataManager() { }
		private StaticDataManager()
		{
			BitdPlaybooks = StaticDataJsonParser.ParsePlaybooks<BitdPlaybookModel>(@"Data/StaticData/BitD/BitD_Playbooks.json", _sharedName);
		}
	}
}
