namespace FitdEntityCommon.Tracks
{
	public class ContainerTrack<TData>
	{
		public ICollection<TData> Items { get; set; } = [];
		public int MaxItems { get; set; } = 0;

		public ContainerTrack() { }

		public ContainerTrack(int pMaxItems = 0)
		{
			MaxItems = pMaxItems;
		}

		public ContainerTrack(int pMaxItems, ICollection<TData> pItems)
		{
			MaxItems = pMaxItems;
			Items = pItems;
		}
	}
}
