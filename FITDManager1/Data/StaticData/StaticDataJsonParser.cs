using JSONWrapper;

using FITDManager.Data.Models.BaseCharacter;

namespace FITDManager.Data.StaticData
{
	public static class StaticDataJsonParser
	{
		public static IEnumerable<TPlaybook> ParsePlaybooks<TPlaybook>(string pFilePath, string pSharedName) where TPlaybook : PlaybookModel
		{
			IEnumerable<TPlaybook> jsonData = JSONUtil.DeserializeArray<TPlaybook>(pFilePath);
			if (!jsonData.Any())
			{
				return [];
			}

			if (jsonData.First().Name != pSharedName)
			{
				return jsonData;
			}

			TPlaybook sharedData = jsonData.First();
			jsonData = jsonData.Skip(1);
			foreach (TPlaybook playbook in jsonData)
			{
				// Add shared special abilities
				List<SpecialAbilityModel> specialAbilities = playbook.SpecialAbilities.ToList();
				specialAbilities.AddRange(sharedData.SpecialAbilities);
				playbook.SpecialAbilities = specialAbilities;
			}
			return jsonData;
		}
	}
}
