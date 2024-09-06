namespace FITDManager.Server.Models.Builds
{
	public class BuildModel<TActionType> : BaseModel where TActionType : Enum
	{
		public int SpecialAbilityId { get; set; } = 0;
		public Dictionary<TActionType, int> ActionDots { get; set; } = [];
	}
}
