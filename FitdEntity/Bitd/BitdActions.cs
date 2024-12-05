namespace FitdEntity.Bitd
{
	public static class BitdActions
	{
		public enum Attributes
		{
			None,
			Insight,
			Prowess,
			Resolve
		}

		public enum Actions
		{
			None,
			Attune,
			Command,
			Consort,
			Finesse,
			Hunt,
			Prowl,
			Skirmish,
			Study,
			Survey,
			Sway,
			Tinker,
			Wreck
		}

		public static IReadOnlyDictionary<Attributes, IReadOnlySet<Actions>> AttributeToActionsMap { get; } = new Dictionary<Attributes, IReadOnlySet<Actions>>()
		{
			{ Attributes.Insight, new HashSet<Actions>([Actions.Hunt, Actions.Study, Actions.Survey, Actions.Tinker]) },
			{ Attributes.Prowess, new HashSet<Actions>([Actions.Finesse, Actions.Prowl, Actions.Skirmish, Actions.Wreck]) },
			{ Attributes.Resolve, new HashSet<Actions>([Actions.Attune, Actions.Command, Actions.Consort, Actions.Sway]) }
		};

		public static IReadOnlyDictionary<Actions, Attributes> ActionToAttributeMap { get; } = new Dictionary<Actions, Attributes>()
		{
			{Actions.Attune, Attributes.Resolve },
			{Actions.Command, Attributes.Resolve },
			{Actions.Consort, Attributes.Resolve },
			{Actions.Finesse, Attributes.Prowess },
			{Actions.Hunt, Attributes.Insight },
			{Actions.Prowl, Attributes.Prowess },
			{Actions.Skirmish, Attributes.Prowess },
			{Actions.Study, Attributes.Insight },
			{Actions.Survey, Attributes.Insight },
			{Actions.Sway, Attributes.Resolve },
			{Actions.Tinker, Attributes.Insight },
			{Actions.Wreck, Attributes.Prowess }
		};
	}
}
