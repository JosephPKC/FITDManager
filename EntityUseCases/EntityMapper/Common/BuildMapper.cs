using FitdCoreEntity.Playbooks.Parts;
using FitdDataEntity.Playbooks.Parts;

namespace EntityMapper.Common
{
	public static class BuildMapper
	{
		public static BuildRefData MapRefDataFromEntity<TAction>(BuildRefEntity<TAction> pEntity) where TAction : struct, Enum
		{
			return new()
			{
				Name = pEntity.Name,
				Id = pEntity.Id,
				BonusActions = MapperUtils.ParseEnumDict(pEntity.BonusActions),
				StartingSpecialAbilityId = pEntity.StartingSpecialAbilityId
			};
		}

		public static BuildRefEntity<TAction> MapRefEntityFromData<TAction>(BuildRefData pData) where TAction : struct, Enum
		{
			return new()
			{
				Name = pData.Name,
				Id = pData.Id,
				BonusActions = MapperUtils.ParseToEnumDict<TAction, int>(pData.BonusActions),
				StartingSpecialAbilityId = pData.StartingSpecialAbilityId
			};
		}
	}
}
