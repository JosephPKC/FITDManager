namespace FitDManager.Server.Models
{
	public abstract class BaseModel
	{
		public required int Id { get; set; }
		public required string Name { get; set; }
	}

	public class BaseModelJson : BaseModel
	{

	}

	public abstract class BaseModelRef : BaseModel
	{

	}
}
