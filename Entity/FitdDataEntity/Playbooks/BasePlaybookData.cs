namespace FitdDataEntity.Playbooks
{
	public abstract class BasePlaybookData : BaseRefData
	{
		/* Basic Data */
		public string SubName { get; init; } = string.Empty;
		public string Description { get; init; } = string.Empty;
		public string XpTrigger { get; init; } = string.Empty;
	}
}
