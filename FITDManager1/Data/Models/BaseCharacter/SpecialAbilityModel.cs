namespace FITDManager.Data.Models.BaseCharacter
{
    public class SpecialAbilityModel :  BaseDataModel
    {
        public string Name { get; set; } = string.Empty;
        /// <summary>
        /// The stylized text.
        /// </summary>
        public string Text { get; set; } = string.Empty;
        public string Notes { get; set; } = string.Empty;
        /// <summary>
        /// Rarely, abilities can be chosen multiple times. This represents how many times it can be chosen, or 'dots'.
        /// </summary>
        public int NbrOfDots { get; set; } = 1;
        public bool IsMandatory { get; set; } = false;
    }
}
