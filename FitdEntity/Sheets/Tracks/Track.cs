namespace FitdEntity.Sheets.Tracks
{
	public class Track
	{
		public int Boxes { get; set; } = 0;
		public int Marks { get; set; } = 0;

		public Track()
		{

		}

		public Track(int pBoxes = 0, int pMarks = 0)
		{
			Boxes = pBoxes;
			Marks = pMarks;
		}
	}
}
