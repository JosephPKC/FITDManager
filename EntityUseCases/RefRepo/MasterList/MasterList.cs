using System.Collections;
using FitdCoreEntity;

namespace RefRepo.MasterList
{
	internal class MasterList<TData>(IEnumerable<TData> pSourceList) : IMasterList<TData> where TData : BaseRefEntity
	{
		protected readonly Dictionary<int, TData> _masterDict = pSourceList.ToDictionary(x => x.Id, x => x);

		#region "IMasterList"
		public int Count {
			get
			{
				return _masterDict.Count;
			}
		}

		public bool Contains(int pId)
		{
			return _masterDict.ContainsKey(pId);
		}

		public IReadOnlyCollection<TData> GetAll()
		{
			return [.. _masterDict.Values];
		}

		public TData? GetById(int pId)
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
