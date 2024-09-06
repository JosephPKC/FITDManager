using FITDManager.Server.Models.Actions;
using FITDManager.Server.Models.Playbooks;

namespace FITDManager.Server.Shared.StaticData
{
	public class StaticDataStore
	{
		public IEnumerable<PlaybookModel<BitDActionTypes>> BitDPlaybooks { get; set; } = [];
		public IEnumerable<PlaybookModel<SaVActionTypes>> SavPlaybooks { get; set; } = [];
	}
}
