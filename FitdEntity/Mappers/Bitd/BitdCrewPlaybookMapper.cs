using FitdEntity.Bitd;
using FitdEntity.Bitd.Playbooks;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.DbRefs.Playbooks.Builds;
using FitdEntity.Playbooks;
using FitdEntity.Playbooks.Builds;

namespace FitdEntity.Mappers.Bitd
{
	internal class BitdCrewPlaybookMapper : IPlaybookMapper<BaseCrewPlaybook, BaseCrewPlaybookRef>
	{
		#region "IPlaybookMapper"
		public BaseCrewPlaybook MapPlaybookFromRef(BaseCrewPlaybookRef pPlaybookRef)
		{
			throw new NotImplementedException();
		}
		public ICollection<BaseCrewPlaybook> MapPlaybooksFromRef(ICollection<BaseCrewPlaybookRef> pPlaybookRefs)
		{
			List<BaseCrewPlaybook> playbooks = [];
			foreach (BaseCrewPlaybookRef playbookRef in pPlaybookRefs)
			{
				playbooks.Add(MapPlaybookFromRef(playbookRef));
			}
			return playbooks;
		}
		#endregion
	}
}
