using FitDManager.Server.Models.Actions;

namespace FitDManager.Server.Models.Builds
{
	public class BuildRef<TAction> : BaseModelRef where TAction : Enum
	{
		public required Dictionary<TAction, int> ActionDots { get; set; };
		public required int SpecialAbilityId { get; set; }
	}

	public class BitDBuildRef : BuildRef<BitDActions> { }
}
