using FitdConfig;

namespace FitdEntity
{
	public abstract class BaseEntity : IHasId
	{
		#region "IHasId"
		public required Guid Id { get; set; }
		#endregion
	}
}
