using LiteDbAdapter.DbModels.Actions;

namespace LiteDbAdapter.DbModels.DbDataParts.Builds
{
    public class BuildDbModel : BaseDbModelPart
    {
        public int? AbilityIndex { get; set; } = null;
        public IReadOnlyDictionary<BitdAttributeActions.Actions, int>? ActionDots { get; set; } = null;
    }
}
