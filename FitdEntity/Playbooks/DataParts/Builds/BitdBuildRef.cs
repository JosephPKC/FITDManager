using FitdEntity.Actions;

namespace FitdEntity.Playbooks.DataParts.Builds
{
    public class BitdBuildRef : BuildRef
    {
        public IReadOnlyDictionary<BitdActions.Actions, int> ActionDots { get; set; } = new Dictionary<BitdActions.Actions, int>();
    }
}
