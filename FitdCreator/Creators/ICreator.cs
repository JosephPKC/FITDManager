using FitdCreator.Steps.Playbook;

namespace FitdCreator.Creators
{
	public interface ICreator
	{
		IPlaybookStep Start();
	}
}
