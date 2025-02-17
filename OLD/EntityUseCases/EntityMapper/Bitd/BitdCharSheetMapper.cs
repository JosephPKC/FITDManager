using EntityMapper.Common;
using FitdConfig;
using FitdCoreEntity.Bitd;
using FitdCoreEntity.Sheets.States;
using FitdDataEntity.Bitd;

namespace EntityMapper.Bitd
{
	public class BitdCharSheetMapper : IMapper<BitdCharSheetData, BitdCharSheetEntity>, IBitdCharSheetMapper
	{
		#region "IMapper"
		public BitdCharSheetData MapDataFromEntity(BitdCharSheetEntity pEntity)
		{
			BitdCharSheetData data = new()
			{
				Id = pEntity.Id,
				Name = pEntity.Name,
				DateCreated = pEntity.DateCreated.ToString(),
				DateLastModified = pEntity.DateLastModified.ToString() ?? "",
				Notes = pEntity.Notes,
				GameType = pEntity.GameType.ToString(),
				PlaybookRefId = pEntity.PlaybookRefId,
				MaxActionRating = pEntity.MaxActionRating,
				MaxAttributeRating = pEntity.MaxAttributeRating,
				CrewName = pEntity.CrewName,
				Alias = pEntity.Alias,
				Look = pEntity.Look,
				Heritage = pEntity.Heritage,
				Background = pEntity.Background,
				Vice = pEntity.Vice,
				Purveyor = pEntity.Purveyor,
				HasArmor = MapperUtils.ParseTriState(pEntity.HasArmor, ArmorStates.Ready, ArmorStates.Broken),
				HasHeavy = MapperUtils.ParseTriState(pEntity.HasHeavy, ArmorStates.Ready, ArmorStates.Broken),
				HasSpecial = MapperUtils.ParseTriState(pEntity.HasSpecial, ArmorStates.Ready, ArmorStates.Broken),
				ActionRatings = MapperUtils.ParseEnumDict(pEntity.ActionRatings),
				AttributeRatings = MapperUtils.ParseEnumDict(pEntity.AttributeRatings),
				SpecialAbilities = MapperUtils.ParseObjCol(pEntity.SpecialAbilities, SpecialAbilityMapper.MapDataFromEntity),
				LearnedSpecialAbilities = MapperUtils.CreateColCopy(pEntity.LearnedSpecialAbilities),
				Contacts = MapperUtils.ParseObjCol(pEntity.Contacts, ContactMapper.MapDataFromEntity),
				AllyContacts = MapperUtils.CreateColCopy(pEntity.AllyContacts),
				NeutralContacts = MapperUtils.CreateColCopy(pEntity.NeutralContacts),
				RivalContacts = MapperUtils.CreateColCopy(pEntity.RivalContacts),
				Items = MapperUtils.ParseObjCol(pEntity.Items, ItemMapper.MapDataFromEntity),
				SelectedItems = MapperUtils.CreateColCopy(pEntity.SelectedItems),
				Loadout = MapperUtils.ParseTriState(pEntity.Loadout, LoadoutStates.Heavy, LoadoutStates.Light)
			};

			// Tracks
			(data.MaxStress, data.CurrentStress, _) = MapperUtils.ParseTrack(pEntity.Stress);
			(data.MaxTrauma, data.Trauma) = MapperUtils.ParseContainerTrack(pEntity.Trauma);
			(data.MaxHealing, data.CurrentHealing, data.MinHealing) = MapperUtils.ParseTrack(pEntity.Healing);
			(data.MaxMinorHarm, data.MinorHarm) = MapperUtils.ParseContainerTrack(pEntity.MinorHarm);
			(data.MaxModerateHarm, data.ModerateHarm) = MapperUtils.ParseContainerTrack(pEntity.ModerateHarm);
			(data.MaxMajorHarm, data.MajorHarm) = MapperUtils.ParseContainerTrack(pEntity.MajorHarm);
			(data.MaxCoin, data.CurrentCoin, _) = MapperUtils.ParseTrack(pEntity.Coin);
			(data.MaxStash, data.CurrentStash, _) = MapperUtils.ParseTrack(pEntity.Stash);
			(data.MaxPlaybookXp, data.CurrentPlaybookXp, _) = MapperUtils.ParseTrack(pEntity.PlaybookXp);
			(data.MaxInsightXp, data.CurrentInsightXp, _) = MapperUtils.ParseTrack(pEntity.InsightXp);
			(data.MaxProwessXp, data.CurrentProwessXp, _) = MapperUtils.ParseTrack(pEntity.ProwessXp);
			(data.MaxResolveXp, data.CurrentResolveXp, _) = MapperUtils.ParseTrack(pEntity.ResolveXp);

			return data;
		}

		public BitdCharSheetEntity MapEntityFromData(BitdCharSheetData pData)
		{
			return new()
			{
				Id = pData.Id,
				Name = pData.Name,
				DateCreated = DateTime.Parse(pData.DateCreated),
				DateLastModified = !string.IsNullOrWhiteSpace(pData.DateLastModified) ? DateTime.Parse(pData.DateLastModified) : null,
				Notes = pData.Notes,
				GameType = Enum.Parse<GameTypes>(pData.GameType),
				PlaybookRefId = pData.PlaybookRefId,
				MaxActionRating = pData.MaxActionRating,
				MaxAttributeRating = pData.MaxAttributeRating,
				CrewName = pData.CrewName,
				Alias = pData.Alias,
				Look = pData.Look,
				Heritage = pData.Heritage,
				Background = pData.Background,
				Vice = pData.Vice,
				Purveyor = pData.Purveyor,
				Stress = new(pData.MaxStress, pData.CurrentStress),
				Trauma = new(pData.MaxTrauma, pData.Trauma),
				MinorHarm = new(pData.MaxMinorHarm, pData.MinorHarm),
				ModerateHarm = new(pData.MaxModerateHarm, pData.ModerateHarm),
				MajorHarm = new(pData.MaxMajorHarm, pData.MajorHarm),
				Healing = new(pData.MaxHealing, pData.CurrentHealing, pData.MinHealing),
				HasArmor = MapperUtils.ParseToTriState(pData.HasArmor, ArmorStates.Ready, ArmorStates.Broken, ArmorStates.None),
				HasHeavy = MapperUtils.ParseToTriState(pData.HasHeavy, ArmorStates.Ready, ArmorStates.Broken, ArmorStates.None),
				HasSpecial = MapperUtils.ParseToTriState(pData.HasSpecial, ArmorStates.Ready, ArmorStates.Broken, ArmorStates.None),
				Coin = new(pData.MaxCoin, pData.CurrentCoin),
				Stash = new(pData.MaxStash, pData.CurrentStash),
				PlaybookXp = new(pData.MaxPlaybookXp, pData.CurrentPlaybookXp),
				InsightXp = new(pData.MaxInsightXp, pData.CurrentInsightXp),
				ProwessXp = new(pData.MaxProwessXp, pData.CurrentProwessXp),
				ResolveXp = new(pData.MaxResolveXp, pData.CurrentResolveXp),
				ActionRatings = MapperUtils.ParseToEnumDict<BitdActions.Actions, int>(pData.ActionRatings),
				AttributeRatings = MapperUtils.ParseToEnumDict<BitdActions.Attributes, int>(pData.AttributeRatings),
				SpecialAbilities = MapperUtils.ParseObjCol(pData.SpecialAbilities, SpecialAbilityMapper.MapEntityFromData),
				LearnedSpecialAbilities = MapperUtils.CreateColCopy(pData.LearnedSpecialAbilities),
				Contacts = MapperUtils.ParseObjCol(pData.Contacts, ContactMapper.MapEntityFromData),
				AllyContacts = MapperUtils.CreateColCopy(pData.AllyContacts),
				NeutralContacts = MapperUtils.CreateColCopy(pData.NeutralContacts),
				RivalContacts = MapperUtils.CreateColCopy(pData.RivalContacts),
				Items = MapperUtils.ParseObjCol(pData.Items, ItemMapper.MapEntityFromData),
				SelectedItems = MapperUtils.CreateColCopy(pData.SelectedItems),
				Loadout = MapperUtils.ParseToTriState(pData.Loadout, LoadoutStates.Heavy, LoadoutStates.Light, LoadoutStates.Normal)
			};
		}
		#endregion
	}
}
