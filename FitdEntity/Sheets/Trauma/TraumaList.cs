using System.Collections;

namespace FitdEntity.Sheets.Trauma
{
    /// <summary>
    /// The trauma list has a specified max length. It is an implementation of Collection<string>.
    /// </summary>
    public class TraumaList(int pMaxTrauma = 4) : ICollection<string>
    {
        protected readonly ICollection<string> _trauma = [];
        public int MaxTrauma { get; } = pMaxTrauma;

        #region ICollection<string>
        public int Count
        {
            get
            {
                return _trauma.Count;
            }
        }

        public bool IsReadOnly
        {
            get
            {
                return false;
            }
        }

        public void Add(string pTrauma)
        {
            if (Count == MaxTrauma)
            {
                throw new InvalidOperationException($"Cannot add {pTrauma}. Already at maximum trauma {Count}.");
            }

            _trauma.Add(pTrauma);
        }

        public void Clear()
        {
            _trauma.Clear();
        }

        public bool Contains(string pTrauma)
        {
            return _trauma.Contains(pTrauma);
        }

        public void CopyTo(string[] pArray, int pArrayIndex)
        {
            _trauma.CopyTo(pArray, pArrayIndex);
        }

        public bool Remove(string pTrauma)
        {
            return _trauma.Remove(pTrauma);
        }

        public IEnumerator<string> GetEnumerator()
        {
            return _trauma.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _trauma.GetEnumerator();
        }
        #endregion
    }
}
