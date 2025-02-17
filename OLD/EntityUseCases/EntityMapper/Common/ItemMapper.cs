using FitdCoreEntity.Playbooks.Parts;
using FitdCoreEntity.Sheets.Parts;
using FitdDataEntity.Playbooks.Parts;
using FitdDataEntity.Sheets.Parts;

namespace EntityMapper.Common
{
	public static class ItemMapper
	{
		public static ItemData MapDataFromEntity(ItemEntity pEntity)
		{
			return new() 
			{
				Name = pEntity.Name,
				Id = pEntity.Id, 
				RefId = pEntity.RefId,
				IsCustom = pEntity.IsCustom,
				Text = pEntity.Text,
				Loadout = pEntity.Loadout,
				IsCommon = pEntity.IsCommon,
				IsCrafted = pEntity.IsCrafted
			};

		}

		public static ItemEntity MapEntityFromData(ItemData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				RefId = pData.RefId,
				IsCustom = pData.IsCustom,
				Text = pData.Text,
				Loadout = pData.Loadout,
				IsCommon = pData.IsCommon,
				IsCrafted = pData.IsCrafted
			};
		}

		public static ItemRefData MapRefDataFromEntity(ItemRefEntity pEntity)
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				Text = pEntity.Text,
				Loadout = pEntity.Loadout
			};

		}

		public static ItemRefEntity MapRefEntityFromData(ItemRefData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				Text = pData.Text,
				Loadout = pData.Loadout
			};
		}
	}
}
