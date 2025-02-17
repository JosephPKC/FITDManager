namespace FitdCreator
{
	public class Class1
	{
		// Creator needs to be able to create a brand new sheet OR load up an existing sheet, edit the sheet based on user input, and save the sheet.
		// How to edit the sheet? the character creation process has a specific order: choose playbook, choose background/heritage, choose ability, set actions, set contacts, misc stuff.
		// While most of this can be done at any time, these things are the strict order: playbook (it dictates ability, actions, contacts), background/heritage influences actions, everything else. playbook and background/heritage can be any order but they have to be first.
		// Individual methods need to have assertions to check if strict order is valid or not. Otherwise, potential invalid edits can happen.
		// Singular method can enforce order but requires user to input everything at the start (which makes no sense)
		// We can have a series of classes. Each one has methods that output the next object.
		//	So each step is a class. Each class outputs the next step object with its own methods.
		//	Char creator just starts the process and creates the first object.
		//	Each step needs to have its own specific methods for editing a sheet. It requires a reference to the sheet controls and the sheet obj
	}
}
