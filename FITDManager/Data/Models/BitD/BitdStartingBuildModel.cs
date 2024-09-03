using FITDManager.Data.Models.BaseCharacter;

namespace FITDManager.Data.Models.BitD
{
    public class BitdStartingBuildModel : StartingBuildModel
    {
        public Dictionary<BitdActions, int> AdditionalActionDots { get; set; } = [];
    }
}
