namespace FitdCoreEntity
{
	public abstract class BaseNonRefEntity : BaseCoreEntity
	{
		public required Guid Id { get; init; }
	}
}
