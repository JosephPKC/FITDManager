namespace FitdEntity.Playbooks
{
	public abstract class BasePlaybook : BaseRef
	{
		/* Basic Data */
		public string Name { get; set; } = string.Empty;
		public string Subname { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public string XpTrigger { get; set; } = string.Empty;
	}
}
