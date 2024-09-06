using FITDManager.Data.Models.BaseCharacter;

namespace FITDManager.Data.Models.BitD
{
    public class BitdPlaybookModel : PlaybookModel
    {
        // Action Dots
        public Dictionary<BitdActions, int> StartingActionDots { get; set; } = [];
        // Starting Builds
        public IEnumerable<BitdStartingBuildModel> StartingBuilds { get; set; } = [];
    }
}
