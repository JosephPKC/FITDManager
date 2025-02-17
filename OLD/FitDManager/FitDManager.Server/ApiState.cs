namespace FitDManager.Server
{
	public class ApiState
	{
		private static readonly ApiState _instance = new();
		public static ApiState Instance {
			get
			{
				return _instance;
			}
		}

		static ApiState() { }

		private ApiState() { }

		private readonly BitdCharSheet _sheet = new()
		{
			Id = "test0",
			CrewName = "CrewName",
			Name = "Name",
			Alias = "Alias",
			Look = "Look",
			Heritage = "Heritage",
			Background = "Background",
			Vice = "Vice",
			Purveyor = "Purveyor"
		};
		public BitdCharSheet Sheet {
			get
			{
				return _sheet;
			}
		}
	}
}
