namespace FitdEntity.Sheets.Harm
{
    /// <summary>
    /// Harm needs to be modelled like a pyramid. Each level of harm has its own maximum.
    /// </summary>
    public class HarmPyramid(int pMaxFirstLevel = 2, int pMaxSecondLevel = 2, int pMaxThirdLevel = 1)
    {
        public enum HarmLevel
        {
            First,
            Second,
            Third
        }

        private readonly Dictionary<HarmLevel, ICollection<string>> _harmPyramid = new() {
            { HarmLevel.First, [] },
            { HarmLevel.Second, [] },
            { HarmLevel.Third, [] }
        };

        private readonly Dictionary<HarmLevel, int> _maxHarm = new() {
            { HarmLevel.First, pMaxFirstLevel },
            { HarmLevel.Second, pMaxSecondLevel },
            { HarmLevel.Third, pMaxThirdLevel }
        };

        /// <summary>
        /// Adds harm to the specified level.
        /// </summary>
        /// <param name="pHarm">The specified harm.</param>
        /// <param name="pLevel">The specified harm level.</param>
        /// <returns>True, if adding harm is successful. False, if the current harm level is already full.</returns>
        public bool Add(string pHarm, HarmLevel pLevel)
        {
            int currentCount = _harmPyramid[pLevel].Count;
            int maxCount = _maxHarm[pLevel];
            if (currentCount == maxCount)
            {
                return false;
            }

            _harmPyramid[pLevel].Add(pHarm);
            return true;
        }

        public bool Remove(string pHarm, HarmLevel pLevel)
        {
            return _harmPyramid[pLevel].Remove(pHarm);
        }
    }
}
