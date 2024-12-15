namespace FitdEntity.DataStructs
{
    public class Track
    {
        public int NbrOfBoxes { get; set; } = 0;
        public int NbrOfMarks { get; set; } = 0;

        public Track() { }

        public Track(int pNbrOfBoxes = 0, int pNbrOfMarks = 0)
        {
            NbrOfBoxes = pNbrOfBoxes;
            NbrOfMarks = pNbrOfMarks;
        }
    }
}
