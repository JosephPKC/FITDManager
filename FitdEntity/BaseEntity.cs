namespace FitdEntity
{
	public abstract class BaseEntity
	{
		public required Guid Id { get; init; }
		public string Name { get; set; } = string.Empty;
	}
}
