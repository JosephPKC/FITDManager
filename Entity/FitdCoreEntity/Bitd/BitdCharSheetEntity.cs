using FitdCoreEntity.Sheets;
using FitdCoreEntity.Sheets.Parts;
using FitdCoreEntity.Sheets.States;
using FitdEntityCommon.Tracks;

namespace FitdCoreEntity.Bitd
{
    public class BitdCharSheetEntity : BaseCharSheetEntity
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

		/* Stress, Trauma, Healing */
		public Track Stress { get; set; } = new(8, 0);
		public ContainerTrack<string> Trauma { get; set; } = new(4);
		public Track Healing { get; set; } = new(4, 0);

		/* Harm */
		public ContainerTrack<string> MinorHarm { get; set; } = new(2);
		public ContainerTrack<string> ModerateHarm { get; set; } = new(2);
		public ContainerTrack<string> MajorHarm { get; set; } = new(1);

		/* Armor */
		public ArmorStates HasArmor { get; set; } = ArmorStates.None;
		public ArmorStates HasHeavy { get; set; } = ArmorStates.None;
		public ArmorStates HasSpecial { get; set; } = ArmorStates.None;

		/* Coin, Stash */
		public Track Coin { get; set; } = new(4, 0);
		public Track Stash { get; set; } = new(40, 0);

		/* Xp */
		public Track PlaybookXp { get; set; } = new(8, 0);
		public Track InsightXp { get; set; } = new(6, 0);
		public Track ProwessXp { get; set; } = new(6, 0);
		public Track ResolveXp { get; set; } = new(6, 0);

		/* Actions & Attributes */
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

		/* Special Abilities */
		public ICollection<SpecialAbilityEntity> SpecialAbilities { get; set; } = [];
		public IDictionary<Guid, int> LearnedSpecialAbilities { get; set; } = new Dictionary<Guid, int>();

		/* Contacts */
		public ICollection<ContactEntity> Contacts { get; set; } = [];
		public ISet<Guid> AllyContacts { get; set; } = new HashSet<Guid>();
		public ISet<Guid> NeutralContacts { get; set; } = new HashSet<Guid>();
		public ISet<Guid> RivalContacts { get; set; } = new HashSet<Guid>();

		/* Items */
		public ICollection<ItemEntity> Items { get; set; } = [];
		public ISet<Guid> SelectedItems { get; set; } = new HashSet<Guid>();
		public LoadoutStates Loadout { get; set; } = LoadoutStates.None;
	}
}
