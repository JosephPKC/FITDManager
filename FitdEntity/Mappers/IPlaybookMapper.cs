using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Playbooks;

namespace FitdEntity.Mappers
{
	public interface IPlaybookMapper<TPlaybook, TPlaybookRef> where TPlaybook : BasePlaybook where TPlaybookRef : BasePlaybookRef
	{
		TPlaybook MapPlaybookFromRef(TPlaybookRef pPlaybookRef);
		ICollection<TPlaybook> MapPlaybooksFromRef(ICollection<TPlaybookRef> pPlaybookRefs);
	}
}
