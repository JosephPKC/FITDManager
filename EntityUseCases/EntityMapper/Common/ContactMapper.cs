using FitdCoreEntity.Playbooks.Parts;
using FitdCoreEntity.Sheets.Parts;
using FitdDataEntity.Playbooks.Parts;
using FitdDataEntity.Sheets.Parts;

namespace EntityMapper.Common
{
	public static class ContactMapper
	{
		public static ContactData MapDataFromEntity(ContactEntity pEntity)
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				RefId = pEntity.RefId,
				IsCustom = pEntity.IsCustom,
				Text = pEntity.Text
			};
		}

		public static ContactEntity MapEntityFromData(ContactData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				RefId = pData.RefId,
				IsCustom = pData.IsCustom,
				Text = pData.Text
			};
		}

		public static ContactRefData MapRefDataFromEntity(ContactRefEntity pEntity)
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				Text = pEntity.Text
			};
		}

		public static ContactRefEntity MapRefEntityFromData(ContactRefData pData)
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				Text = pData.Text
			};
		}
	}
}
