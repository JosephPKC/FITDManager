using FitdConfig;

namespace GistBuilder.PlaybookGists
{
	public class PlaybookGist
	{
		public int Id { get; set; }
		public string Name { get; set; } = string.Empty;
		public string SubName { get; set; } = string.Empty;
		public string Description { get; set; } = string.Empty;
		public GameTypes GameType { get; set; } = GameTypes.None;
	}
}
