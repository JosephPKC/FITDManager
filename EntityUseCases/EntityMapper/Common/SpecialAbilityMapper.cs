using FitdCoreEntity.Playbooks.Parts;
using FitdCoreEntity.Sheets.Parts;
using FitdDataEntity.Playbooks.Parts;
using FitdDataEntity.Sheets.Parts;

namespace EntityMapper.Common
{
	public static class SpecialAbilityMapper
	{
		public static SpecialAbilityData MapDataFromEntity(SpecialAbilityEntity pEntity)
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				RefId = pEntity.RefId,
				IsCustom = pEntity.IsCustom,
				Text = pEntity.Text,
				NbrOfBoxes = pEntity.NbrOfBoxes,
				IsFromVeteran = pEntity.IsFromVeteran
			};
		}

		public static SpecialAbilityEntity MapEntityFromData(SpecialAbilityData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				RefId = pData.RefId,
				IsCustom = pData.IsCustom,
				Text = pData.Text,
				NbrOfBoxes = pData.NbrOfBoxes,
				IsFromVeteran = pData.IsFromVeteran
			};
		}

		public static SpecialAbilityRefData MapRefDataFromEntity(SpecialAbilityRefEntity pEntity)
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				Text = pEntity.Text,
				NbrOfBoxes = pEntity.NbrOfBoxes
			};
		}

		public static SpecialAbilityRefEntity MapRefEntityFromData(SpecialAbilityRefData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				Text = pData.Text,
				NbrOfBoxes = pData.NbrOfBoxes
			};
		}
	}
}
