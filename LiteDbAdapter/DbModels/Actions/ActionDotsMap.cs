namespace LiteDbAdapter.DbModels.Actions
{
    public class ActionDotsMap<TAction>(IDictionary<TAction, int> pActionDotsDict) where TAction : Enum
    {
        protected Dictionary<TAction, int> _actionDots = new(pActionDotsDict);

        public void AddOrUpdate(TAction pAction, int pDots)
        {
            if (!_actionDots.TryAdd(pAction, pDots))
            {
                _actionDots[pAction] = pDots;
            }
        }

        public int Get(TAction pAction)
        {
            return _actionDots[pAction];
        }
    }
}
