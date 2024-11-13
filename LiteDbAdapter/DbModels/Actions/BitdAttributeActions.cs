namespace LiteDbAdapter.DbModels.Actions
{
    public static class BitdAttributeActions
    {
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

        public enum Attributes
        {
            None,
            Insight,
            Prowess,
            Resolve
        }

        private static readonly Dictionary<Attributes, ICollection<Actions>> _attributeToActionsMap = new()
        {
            { Attributes.Insight, [Actions.Hunt, Actions.Study, Actions.Survey, Actions.Tinker] },
            { Attributes.Prowess, [Actions.Finesse, Actions.Prowl, Actions.Skirmish, Actions.Wreck] },
            { Attributes.Resolve, [Actions.Attune, Actions.Command, Actions.Consort, Actions.Sway] }
        };

        public static IReadOnlyDictionary<Attributes, ICollection<Actions>> AttributeToActionsMap
        {
            get
            {
                return _attributeToActionsMap;
            }
        }

        private static readonly Dictionary<Actions, Attributes> _actionToAttributeMap = new()
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

        public static IReadOnlyDictionary<Actions, Attributes> ActionToAttributeMap
        {
            get
            {
                return _actionToAttributeMap;
            }
        }
    }
}
