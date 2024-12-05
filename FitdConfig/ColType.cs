using System.Diagnostics.CodeAnalysis;

namespace FitdConfig
{
	public class ColType(EntityTypes pEntityType, GameTypes pGameType)
	{
		public EntityTypes EntityType { get; set; } = pEntityType;
		public GameTypes GameType { get; set; } = pGameType;

		public override bool Equals(object? obj)
		{
			if (obj is not ColType other)
			{
				return false;
			}

			return EntityType == other.EntityType && GameType == other.GameType;
		}

		public override int GetHashCode()
		{
			return base.GetHashCode();
		}
	}

	public class ColTypeComparer : IEqualityComparer<ColType>
	{
		#region "IEqualityComparer"
		public bool Equals(ColType? x, ColType? y)
		{
			if (x is null && y is null)
			{
				return true;
			}

			if (x is not null && y is not null)
			{
				return x.Equals(y);
			}

			return false;
		}

		public int GetHashCode([DisallowNull] ColType obj)
		{
			return obj.GetHashCode();
		}
		#endregion
	}
}
