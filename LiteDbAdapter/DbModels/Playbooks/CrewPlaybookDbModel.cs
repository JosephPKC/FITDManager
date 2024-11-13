using LiteDbAdapter.DbModels.DbDataParts.Claims;
using LiteDbAdapter.DbModels.DbDataParts.Grounds;
using LiteDbAdapter.DbModels.DbDataParts.Upgrades;

namespace LiteDbAdapter.DbModels.Playbooks
{
	public class CrewPlaybookDbModel : PlaybookDbModel
	{
		// Upgrades
		public IReadOnlyCollection<int> StartingUpgradeIndices { get; set; } = [];
		public IReadOnlyCollection<UpgradeDbModel> Upgrades { get; set; } = [];

		// Hunting Grounds
		public IReadOnlyCollection<GroundDbModel> HuntingGrounds { get; set; } = [];

		// Claims
		public int? StartingClaimIndex { get; set; } = null;
		public IReadOnlyCollection<ClaimDbModel> Claims { get; set; } = [];
	}
}
