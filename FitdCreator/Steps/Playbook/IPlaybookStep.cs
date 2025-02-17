using FitdCreator.Steps.Background;

namespace FitdCreator.Steps.Playbook
{
	public interface IPlaybookStep
	{
		IBackgroundStep SetPlaybook(int pPlaybookId);
	}
}
