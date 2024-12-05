using System.Collections;

using FitdEntity;

namespace FitdDataIO.Repo.MasterList
{
    internal class MasterList<TData>(IEnumerable<TData> pSourceList) : IMasterList<TData> where TData : IHasId
    {
        protected readonly Dictionary<Guid, TData> _masterDict = pSourceList.ToDictionary(x => x.Id, x => x);

        #region "IMasterList"
        public int Count
        {
            get
            {
                return _masterDict.Count;
            }
        }

        public bool Contains(Guid pId)
        {
            return _masterDict.ContainsKey(pId);
        }

        public IReadOnlyCollection<TData> GetAll()
        {
            return [.. _masterDict.Values];
        }

        public TData? GetById(Guid pId)
        {
            if (_masterDict.TryGetValue(pId, out TData? value))
            {
                return value;
            }

            return default;
        }

        public IEnumerator<TData> GetEnumerator()
        {
            return _masterDict.Values.GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _masterDict.GetEnumerator();
        }
        #endregion
    }
}
