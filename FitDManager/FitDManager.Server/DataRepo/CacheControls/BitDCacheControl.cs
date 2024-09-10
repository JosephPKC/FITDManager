using JsonParser.Parsers;
using FitDManager.Server.DataRepo.DataCaches;
using FitDManager.Server.Models.Abilities;
using FitDManager.Server.Models.Builds;
using FitDManager.Server.Models.Contacts;
using FitDManager.Server.Models.Items;
using FitDManager.Server.Models.Playbooks;

namespace FitDManager.Server.DataRepo.CacheControls
{
    public class BitDCacheControl(IFileParser pParser, string pBaseJsonPath, string pGamePrefix) : BaseCacheControl<BitDCache>(pParser, pBaseJsonPath, pGamePrefix)
	{
		protected override BitDCache LoadData(IFileParser pParser)
		{
			BitDCache cache = new()
			{
				Contacts = (IReadOnlyList<ContactRef>)pParser.DeserializeArrayFromFile<ContactRef>(GetJsonFilePath("DataParts/Contacts", "Contacts")),
				Items = (IReadOnlyList<ItemRef>)pParser.DeserializeArrayFromFile<ItemRef>(GetJsonFilePath("DataParts/Items", "Items")),
				SpecialAbilities = (IReadOnlyList<SpecialAbilityRef>)pParser.DeserializeArrayFromFile<SpecialAbilityRef>(GetJsonFilePath("DataParts/SpecialAbilities", "SpecialAbilities")),
				Builds = (IReadOnlyList<BitDBuildRef>)pParser.DeserializeArrayFromFile<BitDBuildRef>(GetJsonFilePath("DataParts/Builds", "Builds"))
			};
			IReadOnlyList<BitDPlaybookJson> playbookJsons = (IReadOnlyList<BitDPlaybookJson>)pParser.DeserializeArrayFromFile<BitDPlaybookJson>(GetJsonFilePath("Playbooks"));
			
			return new()
			{
				Playbooks = GetPlaybooks(playbookJsons, cache.Contacts, cache.Items, cache.SpecialAbilities, cache.Builds)
			};
		}

		private static IReadOnlyList<BitDPlaybookRef> GetPlaybooks(IReadOnlyList<BitDPlaybookJson> pPlaybookJsons,
			IReadOnlyList<ContactRef> pContactRefs, IReadOnlyList<ItemRef> pItemRefs, IReadOnlyList<SpecialAbilityRef> pSpecialAbilityRefs, IReadOnlyList<BitDBuildRef> pBuildRefs)
		{
			ICollection<BitDPlaybookRef> results = [];
			foreach (BitDPlaybookJson playbookJson in pPlaybookJsons)
			{
				BitDPlaybookRef? result = (BitDPlaybookRef?)PlaybookRefMapper.Map(playbookJson, pContactRefs, pItemRefs, pSpecialAbilityRefs, pBuildRefs);
				if (result != null)
				{
					results.Add(result);
				}
			}

			return (IReadOnlyList<BitDPlaybookRef>)results;
		}
	}
}
