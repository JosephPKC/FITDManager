using EntityMapper.Common;
using FitdCoreEntity.Bitd;
using FitdDataEntity.Bitd;

namespace EntityMapper.Bitd
{
	internal class BitdCharPlaybookMapper : IMapper<BitdCharPlaybookData, BitdCharPlaybookEntity>, IBitdCharPlaybookMapper
	{
		#region "IMapper"
		public BitdCharPlaybookData MapDataFromEntity(BitdCharPlaybookEntity pEntity)
		{
			return new()
			{
				Id = pEntity.Id,
				Name = pEntity.Name,
				SubName = pEntity.SubName,
				Description = pEntity.Description,
				XpTrigger = pEntity.XpTrigger,
				SpecialAbilities = MapperUtils.ParseObjCol(pEntity.SpecialAbilities, SpecialAbilityMapper.MapRefDataFromEntity),
				DefaultSpecialAbilityId = pEntity.DefaultSpecialAbilityId,
				StartingActions = MapperUtils.ParseEnumDict(pEntity.StartingActions),
				StartingBuilds = MapperUtils.ParseObjCol(pEntity.StartingBuilds, BuildMapper.MapRefDataFromEntity),
				Contacts = MapperUtils.ParseObjCol(pEntity.Contacts, ContactMapper.MapRefDataFromEntity),
				Items = MapperUtils.ParseObjCol(pEntity.Items, ItemMapper.MapRefDataFromEntity)
			};
		}

		public BitdCharPlaybookEntity MapEntityFromData(BitdCharPlaybookData pData)
		{
			return new()
			{
				Id = pData.Id,
				Name = pData.Name,
				SubName = pData.SubName,
				Description = pData.Description,
				XpTrigger = pData.XpTrigger,
				SpecialAbilities = MapperUtils.ParseObjCol(pData.SpecialAbilities, SpecialAbilityMapper.MapRefEntityFromData),
				DefaultSpecialAbilityId = pData.DefaultSpecialAbilityId,
				StartingActions = MapperUtils.ParseToEnumDict<BitdActions.Actions, int>(pData.StartingActions),
				StartingBuilds = MapperUtils.ParseObjCol(pData.StartingBuilds, BuildMapper.MapRefEntityFromData<BitdActions.Actions>),
				Contacts = MapperUtils.ParseObjCol(pData.Contacts, ContactMapper.MapRefEntityFromData),
				Items = MapperUtils.ParseObjCol(pData.Items, ItemMapper.MapRefEntityFromData)
			};
		}
		#endregion
	}
}
