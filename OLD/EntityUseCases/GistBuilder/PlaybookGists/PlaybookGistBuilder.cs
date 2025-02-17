using FitdConfig;
using FitdCoreEntity.Playbooks;
using FitdDataEntity.Playbooks;
using Utils;

namespace GistBuilder.PlaybookGists
{
	public static class PlaybookGistBuilder
	{
		public static PlaybookGist BuildGistFromEntity<TPlaybook>(TPlaybook pPlaybook) where TPlaybook : BasePlaybookEntity
		{
			return new()
			{
				Id = pPlaybook.Id,
				Name = pPlaybook.Name,
				SubName = pPlaybook.SubName,
				Description = pPlaybook.Description,
				GameType = pPlaybook.GameType
			};
		}

		public static PlaybookGist BuildGistFromData<TPlaybook>(TPlaybook pPlaybook) where TPlaybook : BasePlaybookData
		{
			return new()
			{
				Id = pPlaybook.Id,
				Name = pPlaybook.Name,
				SubName = pPlaybook.SubName,
				Description = pPlaybook.Description,
				GameType = Enum.Parse<GameTypes>(StringUtils.ToSingleWordTitleCase(pPlaybook.GameType))
			};
		}
	}
}
