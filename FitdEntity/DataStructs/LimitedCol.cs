namespace FitdEntity.DataStructs
{
    public class LimitedCol<TItem>
    {
        public ICollection<TItem> Items { get; set; } = [];
        public int MaxItems { get; set; } = 0;

        public LimitedCol() { }

        public LimitedCol(int pMaxItems = 0)
        {
			MaxItems = pMaxItems;
        }
    }
}
