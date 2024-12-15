using FitdEntity.Bitd;
using FitdEntity.Bitd.Playbooks;
using FitdEntity.DbRefs.Playbooks.Builds;
using FitdEntity.Playbooks.Builds;

namespace FitdEntity.Mappers.Bitd
{
	internal class BitdCharPlaybookMapper : IPlaybookMapper<BitdCharPlaybook, BitdCharPlaybookRef>
	{
		#region "IPlaybookMapper"
		public BitdCharPlaybook MapPlaybookFromRef(BitdCharPlaybookRef pPlaybookRef)
		{
			return new() {
				Id = pPlaybookRef.Id,
				Name = pPlaybookRef.Name,
				SubName = pPlaybookRef.SubName,
				Description = pPlaybookRef.Description,
				XpTrigger = pPlaybookRef.XpTrigger,
				SpecialAbilities = pPlaybookRef.SpecialAbilities.ToDictionary(x => x.Id, x => x).AsReadOnly(),
				StartingSpecialAbilityId = pPlaybookRef.StartingSpecialAbilityId,
				DefaultSpecialAbilityId = pPlaybookRef.DefaultSpecialAbilityId,
				StartingActions = pPlaybookRef.StartingActions.AsReadOnly(),
				StartingBuilds = pPlaybookRef.StartingBuilds.ToDictionary(x => x.Id, x => MapBuildFromRef(x)).AsReadOnly(),
				Contacts = pPlaybookRef.Contacts.ToDictionary(x => x.Id, x => x).AsReadOnly(),
				Items = pPlaybookRef.Items.ToDictionary(x => x.Id, x => x).AsReadOnly()
			};
		}
		public ICollection<BitdCharPlaybook> MapPlaybooksFromRef(ICollection<BitdCharPlaybookRef> pPlaybookRefs)
		{
			List<BitdCharPlaybook> playbooks = [];
			foreach (BitdCharPlaybookRef playbookRef in pPlaybookRefs)
			{
				playbooks.Add(MapPlaybookFromRef(playbookRef));
			}
			return playbooks;
		}
		#endregion

		private PlaybookBuild<BitdActions.Actions> MapBuildFromRef(PlaybookBuildRef<BitdActions.Actions> pBuild)
		{
			return new() { 
				Id = pBuild.Id,
				Name = pBuild.Name,
				BonusActions = pBuild.BonusActions.AsReadOnly(),
				StartingSpecialAbilityId = pBuild.StartingSpecialAbilityId
			};
		}
	}
}
