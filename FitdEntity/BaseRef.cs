﻿
namespace FitdEntity
{
	public abstract class BaseRef : IHasId
	{
		#region "IHasId"
		public required Guid Id { get; set; }
		#endregion
	}
}
