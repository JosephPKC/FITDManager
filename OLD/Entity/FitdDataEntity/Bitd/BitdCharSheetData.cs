using FitdDataEntity.Sheets;
using FitdDataEntity.Sheets.Parts;

namespace FitdDataEntity.Bitd
{
	public class BitdCharSheetData : BaseCharSheetData
	{
		/* Basic Info */
		public string CrewName { get; set; } = string.Empty;
		public string Alias { get; set; } = string.Empty;
		public string Look { get; set; } = string.Empty;

		/* Heritage, Background, Vice */
		public string Heritage { get; set; } = string.Empty;
		public string Background { get; set; } = string.Empty;
		public string Vice { get; set; } = string.Empty;
		public string Purveyor { get; set; } = string.Empty;

		/* Stress */
		public int CurrentStress { get; set; } = 0;
		public int MaxStress { get; set; } = 8;

		/* Trauma */
		public ICollection<string> Trauma { get; set; } = [];
		public int MaxTrauma { get; set; } = 4;

		/* Harm */
		public ICollection<string> MinorHarm { get; set; } = [];
		public int MaxMinorHarm { get; set; } = 2;
		public ICollection<string> ModerateHarm { get; set; } = [];
		public int MaxModerateHarm { get; set; } = 2;
		public ICollection<string> MajorHarm { get; set; } = [];
		public int MaxMajorHarm { get; set; } = 1;

		/* Healing */
		public int CurrentHealing { get; set; } = 0;
		public int MaxHealing { get; set; } = 4;
		public int MinHealing { get; set; } = 0;

		/* Armor */
		// 0 - No armor, -1 - broken armor, +1 - has armor
		public int HasArmor { get; set; } = 0;
		public int HasHeavy { get; set; } = 0;
		public int HasSpecial { get; set; } = 0;

		/* Coin */
		public int CurrentCoin { get; set; } = 0;
		public int MaxCoin { get; set; } = 4;

		/* Stash */
		public int CurrentStash { get; set; } = 0;
		public int MaxStash { get; set; } = 40;

		/* Xp */
		public int CurrentPlaybookXp { get; set; } = 0;
		public int MaxPlaybookXp { get; set; } = 8;
		public int CurrentInsightXp { get; set; } = 0;
		public int MaxInsightXp { get; set; } = 6;
		public int CurrentProwessXp { get; set; } = 0;
		public int MaxProwessXp { get; set; } = 6;
		public int CurrentResolveXp { get; set; } = 0;
		public int MaxResolveXp { get; set; } = 6;

		/* Actions & Attributes */
		public IDictionary<string, int> ActionRatings { get; set; } = new Dictionary<string, int>()
		{
			{ "ATTUNE", 0 },
			{ "COMMAND", 0 },
			{ "CONSORT", 0 },
			{ "FINESSE", 0 },
			{ "HUNT", 0 },
			{ "PROWL", 0 },
			{ "SKIRMISH", 0 },
			{ "STUDY", 0 },
			{ "SURVEY", 0 },
			{ "SWAY", 0 },
			{ "TINKER", 0 },
			{ "WRECK", 0 }
		};

		public IDictionary<string, int> AttributeRatings { get; set; } = new Dictionary<string, int>()
		{
			{ "INSIGHT", 0 },
			{ "PROWESS", 0 },
			{ "RESOLVE", 0 }
		};

		/* Special Abilities */
		public ICollection<SpecialAbilityData> SpecialAbilities { get; set; } = [];
		public IDictionary<Guid, int> LearnedSpecialAbilities { get; set; } = new Dictionary<Guid, int>();

		/* Contacts */
		public ICollection<ContactData> Contacts { get; set; } = [];
		public ISet<Guid> AllyContacts { get; set; } = new HashSet<Guid>();
		public ISet<Guid> NeutralContacts { get; set; } = new HashSet<Guid>();
		public ISet<Guid> RivalContacts { get; set; } = new HashSet<Guid>();

		/* Items */
		public ICollection<ItemData> Items { get; set; } = [];
		public ISet<Guid> SelectedItems { get; set; } = new HashSet<Guid>();
		// 0 - normal, -1 - light, +1 - heavy
		public int Loadout { get; set; } = 0;
	}
}
