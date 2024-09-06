namespace FITDManager.Server.Models
{
	public abstract class BaseModel
	{
		public int Id { get; set; } = 0;
		public string Name { get; set; } = string.Empty;
	}
}
