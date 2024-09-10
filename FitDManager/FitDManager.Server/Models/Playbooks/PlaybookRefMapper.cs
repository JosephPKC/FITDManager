using ColorConsoleLogger;
using FitDManager.Server.Models;
using FitDManager.Server.Models.Abilities;
using FitDManager.Server.Models.Builds;
using FitDManager.Server.Models.Contacts;
using FitDManager.Server.Models.Items;

namespace FitDManager.Server.Models.Playbooks
{
    public static class PlaybookRefMapper
    {
        private static readonly ColorConsole _log = new(typeof(PlaybookRefMapper));
        public static PlaybookRef<TAction>? Map<TAction>(PlaybookJson<TAction> pJsonModel,
            IReadOnlyList<ContactRef> pContactRefs, IReadOnlyList<ItemRef> pItemRefs, IReadOnlyList<SpecialAbilityRef> pSpecialAbilityRefs, IReadOnlyList<BuildRef<TAction>> pBuildRefs) where TAction : Enum
        {
            return new()
            {
                Id = pJsonModel.Id,
                Name = pJsonModel.Name,
                Subname = pJsonModel.Subname,
                Description = pJsonModel.Description,
                XpTrigger = pJsonModel.XpTrigger,
                DefaultSpecialAbilityId = pJsonModel.DefaultSpecialAbilityId,
                StartingSpecialAbilityId = pJsonModel.StartingSpecialAbilityId,
                SpecialAbilities = GetSpecialAbilities(pJsonModel, pSpecialAbilityRefs),
                Items = GetItems(pJsonModel, pItemRefs),
                Contacts = GetContacts(pJsonModel, pContactRefs),
                StartingBuilds = GetStartingBuilds(pJsonModel, pBuildRefs),
                StartingActionDots = pJsonModel.StartingActionDots
            };
        }

        private static IReadOnlyList<ContactRef> GetContacts<TAction>(PlaybookJson<TAction> pJsonModel, IReadOnlyList<ContactRef> pRefs)
            where TAction : Enum
        {
            return GetDataParts("Contacts", pJsonModel.Id, pJsonModel.Contacts, pRefs);
        }

        private static IReadOnlyList<ItemRef> GetItems<TAction>(PlaybookJson<TAction> pJsonModel, IReadOnlyList<ItemRef> pRefs)
            where TAction : Enum
        {
            return GetDataParts("Item", pJsonModel.Id, pJsonModel.Items, pRefs);
        }

        private static IReadOnlyList<SpecialAbilityRef> GetSpecialAbilities<TAction>(PlaybookJson<TAction> pJsonModel, IReadOnlyList<SpecialAbilityRef> pRefs)
            where TAction : Enum
        {
            return GetDataParts("SpecialAbility", pJsonModel.Id, pJsonModel.SpecialAbilities, pRefs);
        }

        private static IReadOnlyList<BuildRef<TAction>> GetStartingBuilds<TAction>(PlaybookJson<TAction> pJsonModel, IReadOnlyList<BuildRef<TAction>> pRefs)
            where TAction : Enum
        {
            return GetDataParts("Build", pJsonModel.Id, pJsonModel.StartingBuilds, pRefs);
        }

        private static IReadOnlyList<TRef> GetDataParts<TRef>(string pDataPartName, int pJsonModelId, IReadOnlyList<int> pIds, IReadOnlyList<TRef> pDataPartRefs)
            where TRef : BaseModelRef
        {
            ICollection<TRef> results = [];
            foreach (int id in pIds)
            {
                if (id >= pDataPartRefs.Count)
                {
                    _log.Error($"{pDataPartName}Id {id} is invalid when mapping PlaybookJsonModel {pJsonModelId}.");
                    continue;
                }

                results.Add(pDataPartRefs[id]);
            }
            return (IReadOnlyList<TRef>)results;
        }
    }
}
