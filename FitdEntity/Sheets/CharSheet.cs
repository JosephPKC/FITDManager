using FitdEntity.CharParts.Harm;
using FitdEntity.CharParts.Trauma;
using FitdEntity.Sheets.Clocks;

namespace FitdEntity.Sheets
{
    public class CharSheet : BaseSheet
    {
        public string CrewName { get; set; } = string.Empty;
        public string Alias { get; set; } = string.Empty;
        public string Look { get; set; } = string.Empty;

        // These are strings as they can technically be anything.
        // BUT, they typically are taken from a reference list.
        public string Heritage { get; set; } = string.Empty;
        public string Background { get; set; } = string.Empty;
        public string Vice { get; set; } = string.Empty;
        public string Purveyor { get; set; } = string.Empty;

        // These are if we want to allow editing and automated processing for sheets.
        //public Clock Stress { get; set; } = new(9, 0);
        //public TraumaList Trauma { get; set; } = new(4);
        //public HarmPyramid Harm { get; set; } = new(2, 2, 1);
        //public Clock Healing { get; set; } = new(4, 0);
        // If not, we just need data values (i.e. we only want sheet viewing).
        public int MaxStress { get; set; } = 9;
        public int MaxTrauma { get; set; } = 4;
        // Harm for each level
        public int MaxHealing { get; set; } = 4;

        public bool Armor { get; set; } = false;
        public bool Heavy { get; set; } = false;
        public bool Special { get; set; } = false;

        public int Stash { get; set; } = 40;
        public int Coin { get; set; } = 4;

        // XP can be a clock if we want to add processing, or can just be an int for the max value if not.
        public int PlaybookXp { get; set; } = 8;
        public int AttributeXp { get; set; } = 6;

        // Action Dots and Attribute Dots
        // Depends on the game type as we need the enum.

        public string Notes { get; set; } = string.Empty;

        // These will be look ups that refer to the playbook reference.
        //public CharPlaybookRef PlaybookRef { get; set; }
        public ICollection<int> TakenAbilities { get; set; } = [];
        // These should probably be an obj if we want to support custom contacts.
        public ICollection<int> Allies { get; set; } = [];
        public ICollection<int> Rivals { get; set; } = [];
        // These should be an obj if we want to support custom items.
        public ICollection<string> AdditionalItems { get; set; } = [];
    }
}
