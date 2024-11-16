using FitdEntity.Actions;
using FitdEntity.Playbooks.DataParts.Builds;

namespace FitdEntity.Playbooks.CharPlaybooks
{
    public class BitdCharPlaybookRef : CharPlaybookRef
    {
		// Builds
		public IReadOnlyCollection<BitdBuildRef> Builds { get; set; } = [];
		// Actions
		public IReadOnlyDictionary<BitdActions.Actions, int> StartingActions { get; set; } = new Dictionary<BitdActions.Actions, int>();
    }
}
