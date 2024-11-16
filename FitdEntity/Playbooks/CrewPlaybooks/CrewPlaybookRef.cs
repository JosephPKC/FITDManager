using FitdEntity.Playbooks.DataParts.Claims;
using FitdEntity.Playbooks.DataParts.Grounds;
using FitdEntity.Playbooks.DataParts.Upgrades;

namespace FitdEntity.Playbooks.CrewPlaybooks
{
    public class CrewPlaybookRef : BasePlaybookRef
    {
        // Upgrades
        public IReadOnlyCollection<int> StartingUpgradeIndices { get; set; } = [];
        public IReadOnlyCollection<UpgradeRef> Upgrades { get; set; } = [];

        // Hunting Grounds
        public IReadOnlyCollection<GroundRef> HuntingGrounds { get; set; } = [];

        // Claims
        public int? StartingClaimIndex { get; set; } = null;
        public IReadOnlyCollection<ClaimRef> Claims { get; set; } = [];
    }
}
