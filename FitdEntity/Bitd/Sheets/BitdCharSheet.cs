using FitdEntity.DataStructs;
using FitdEntity.Sheets;
using FitdEntity.Sheets.Armor;
using FitdEntity.Sheets.Contacts;
using FitdEntity.Sheets.Harm;
using FitdEntity.Sheets.Items;

namespace FitdEntity.Bitd.Sheets
{
    public class BitdCharSheet : BaseCharSheet
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

		/* Stress, Trauma, Harm, Healing, Armor */
		public Track Stress { get; set; } = new(8, 0);
		public LimitedCol<string> Trauma { get; set; } = new(4);
		public HarmSet Harm { get; set; } = new(2, 2, 1);
		public Track Healing { get; set; } = new(4, 0);
		public ArmorSet Armor { get; set; } = new();

		/* Coin, Stash */
		public Track Coin { get; set; } = new(4, 0);
		public Track Stash { get; set; } = new(40, 0);

		/* Xp */
		public Track PlaybookXp { get; set; } = new(8, 0);
		public Track InsightXp { get; set; } = new(6, 0);
		public Track ProwessXp { get; set; } = new(6, 0);
		public Track ResolveXp { get; set; } = new(6, 0);

		/* Action & Attribute Ratings */
		public IDictionary<BitdActions.Actions, int> ActionRatings { get; set; } = new Dictionary<BitdActions.Actions, int>()
		{
			{ BitdActions.Actions.Attune, 0 },
			{ BitdActions.Actions.Command, 0 },
			{ BitdActions.Actions.Consort, 0 },
			{ BitdActions.Actions.Finesse, 0 },
			{ BitdActions.Actions.Hunt, 0 },
			{ BitdActions.Actions.Prowl, 0 },
			{ BitdActions.Actions.Skirmish, 0 },
			{ BitdActions.Actions.Study, 0 },
			{ BitdActions.Actions.Survey, 0 },
			{ BitdActions.Actions.Sway, 0 },
			{ BitdActions.Actions.Tinker, 0 },
			{ BitdActions.Actions.Wreck, 0 }
		};
		public IDictionary<BitdActions.Attributes, int> AttributeRatings { get; set; } = new Dictionary<BitdActions.Attributes, int>()
		{
			{ BitdActions.Attributes.Insight, 0 },
			{ BitdActions.Attributes.Prowess, 0 },
			{ BitdActions.Attributes.Resolve, 0 }
		};

		/* Contacts */
		public IDictionary<Guid, Contact> AvailableContacts { get; set; } = new Dictionary<Guid, Contact>();
		public ContactSet ContactIds { get; set; } = new();

		/* Items */
		public IDictionary<Guid, Item> AvailableItems { get; set; } = new Dictionary<Guid, Item>();
		public ISet<Guid> SelectedItemIds { get; set; } = new HashSet<Guid>();
		public LoadoutStates Loadout { get; set; } = LoadoutStates.None;
	}
}
