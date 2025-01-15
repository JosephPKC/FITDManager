using FitdCoreEntity.Playbooks;
using FitdCoreEntity.Playbooks.Parts;
using FitdDataEntity.Playbooks;
using RefRepo.MasterList;

namespace RefRepo
{
	public interface IRepo<TCharPlaybookData, TCrewPlaybookData, TCharPlaybookEntity, TCrewPlaybookEntity> 
		where TCharPlaybookData : BaseCharPlaybookData 
		where TCrewPlaybookData : BaseCrewPlaybookData
		where TCharPlaybookEntity : BaseCharPlaybookEntity
		where TCrewPlaybookEntity : BaseCrewPlaybookEntity
	{
		IMasterList<SpecialAbilityRefEntity> CharSpecialAbilities { get; }
		IMasterList<SpecialAbilityRefEntity> CrewSpecialAbilities { get; }
		IMasterList<TCharPlaybookEntity> CharPlaybooks { get; }
		IMasterList<TCrewPlaybookEntity> CrewPlaybooks { get; }
	}
}
