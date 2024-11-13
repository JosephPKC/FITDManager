namespace LiteDbAdapter.DbModels.DbDataParts.Abilities
{
    public class AbilityDbModel : BaseDbModelPart
    {
        public string Text { get; set; } = string.Empty;
		public int NbrOfDots { get; set; } = 1;
    }
}
