using FitdEntity.Bitd.Playbooks;
using FitdEntity.Bitd.Sheets;
using FitdEntity.DbRefs.Playbooks;
using FitdEntity.Mappers;
using FitdEntity.Playbooks;
using FitdEntity.Sheets;
using FitdEntityControls.Repo;
using FitdEntityControls.SheetSaveManager;
using FitdGateway;
using FitdGateway.RefGateway;
using FitdGateway.SheetGateway;
using LiteDbAdapter;
using LogWrapper.Loggers.Log4Net.ColorConsole;
using System.Text;

namespace FitdTester
{
	// TODO:
	// - For refs only, create two sets of models: one that matches json easily and for storage into db. And, one for usage via repo. Repo will have mappers that map from the json-db version to the repo version and it caches that.
	// - Issue is: string id's in the dict in jsons, which i think causes conversion issues when deserializing from litedb to model. And, I think there might be an issue with the enum being stored as a string and converting it to enum might be off.
	public class Program
	{
		private static readonly string _dbPath = "test.db";
		private static readonly string _dbRefPath = "FitdRefDb.db";

		private static SheetSaveManager<BitdCharSheet>? _sheetSaveManager = null;
		private static SheetSaveManager<BitdCharSheet> SheetSaveManager {
			get
			{
				if (_sheetSaveManager is not null)
				{
					return _sheetSaveManager;
				}

				_sheetSaveManager = new(SheetGateway);
				return _sheetSaveManager;
			}
		}

		private static ISheetGateway? _sheetGateway = null;
		private static ISheetGateway SheetGateway {
			get
			{
				if (_sheetGateway is not null)
				{
					return _sheetGateway;
				}

				_sheetGateway = GatewayFactory.CreateNewSheetGateway(Adapter);
				return _sheetGateway;
			}
		}

		private static IRefGateway? _refGateway = null;
		private static IRefGateway RefGateway {
			get
			{
				if (_refGateway is not null)
				{
					return _refGateway;
				}

				_refGateway = GatewayFactory.CreateNewRefGateway(RefAdapter);
				return _refGateway;
			}
		}

		private static IDataAdapter? _adapter = null;
		private static IDataAdapter Adapter {
			get
			{
				if (_adapter is not null)
				{
					return _adapter;
				}

				_adapter = LiteDbAdapterFactory.CreateNewAdapter(_dbPath, new ColorConsoleLoggerFactory());
				return _adapter;
			}
		}

		private static IDataAdapter? _refAdapter = null;
		private static IDataAdapter RefAdapter {
			get
			{
				if (_refAdapter is not null)
				{
					return _refAdapter;
				}

				_refAdapter = LiteDbAdapterFactory.CreateNewAdapter(_dbRefPath, new ColorConsoleLoggerFactory());
				return _refAdapter;
			}
		}

		private static IRepo<BitdCharPlaybook, BaseCrewPlaybook, BitdCharPlaybookRef, BaseCrewPlaybookRef>? _repo = null;
		private static IRepo<BitdCharPlaybook, BaseCrewPlaybook, BitdCharPlaybookRef, BaseCrewPlaybookRef> Repo {
			get
			{
				if (_repo is not null)
				{
					return _repo;
				}

				_repo = RepoFactory.CreateNewRepo<BitdCharPlaybook, BaseCrewPlaybook, BitdCharPlaybookRef, BaseCrewPlaybookRef>(RefGateway, FitdConfig.GameTypes.BitD, CharMapper, CrewMapper);
				return _repo;
			}
		}

		private static IPlaybookMapper<BitdCharPlaybook, BitdCharPlaybookRef>? _charMapper = null;
		private static IPlaybookMapper<BitdCharPlaybook, BitdCharPlaybookRef> CharMapper {
			get
			{
				if (_charMapper is not null)
				{
					return _charMapper;
				}

				_charMapper = PlaybookMapperFactory.CreateNewBitdCharPlaybookMapper();
				return _charMapper;
			}
		}

		private static IPlaybookMapper<BaseCrewPlaybook, BaseCrewPlaybookRef>? _crewMapper = null;
		private static IPlaybookMapper<BaseCrewPlaybook, BaseCrewPlaybookRef> CrewMapper {
			get
			{
				if (_crewMapper is not null)
				{
					return _crewMapper;
				}

				_crewMapper = PlaybookMapperFactory.CreateNewBitdCrewPlaybookMapper();
				return _crewMapper;
			}
		}

		private static BitdCharSheet? _charSheet = null;
		private static ICollection<BitdCharPlaybook> _allCharPlaybooks = [];

		public static void Main(string[] pArgs)
		{
			while (true)
			{
				try
				{
					Console.Write(">>:");
					string? input = Console.ReadLine();
					ProcessInput(input);
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.ToString());
				}
			}
		}

		private static void ProcessInput(string? pInput)
		{
			ArgumentNullException.ThrowIfNullOrWhiteSpace(pInput);

			Tuple<string, string> args = ParseInput(pInput);
			switch (args.Item1.ToUpper())
			{
				// Get Sheet via Id
				// Get All Sheet Meta Data List
				// Delete Sheet via Id
				// Create new Sheet
				// Update existing Sheet
				// Save sheet

				case "C":
				case "CREATE":
					_charSheet = CreateSheet(args.Item2);
					DisplaySheet();
					break;
				case "D":
				case "DELETE":
					DeleteSheet(args.Item2);
					break;
				case "F":
				case "FETCH":
					ICollection<SheetMetaData> allMetaData = FetchAll();
					DisplayMetaDataList(allMetaData);
					break;
				case "L":
				case "LOAD":
					_charSheet = LoadSheet(args.Item2);
					DisplaySheet();
					break;
				case "S":
				case "SAVE":
					SaveSheet();
					DisplaySheet();
					break;
				case "U":
				case "UPDATE":
					UpdateSheet(args.Item2);
					DisplaySheet();
					break;
				case "LP":
				case "LOADPLAYBOOKS":
					_allCharPlaybooks = GetAllPlaybooks();
					DisplayAllPlaybooks();
					break;
			}
		}

		private static void DisplaySheet()
		{
			if (_charSheet is null)
			{
				return;
			}
			Console.WriteLine("Current Sheet: ");
			Console.WriteLine($"{_charSheet.Name}");
			Console.WriteLine($"Id: {_charSheet.Id}");
			Console.WriteLine($"Date Created: {_charSheet.DateCreated}");
			Console.WriteLine($"Date Modified: {_charSheet.DateLastModified}");
		}

		private static Tuple<string, string> ParseInput(string pInput)
		{
			string[] inputArgs = pInput.Split(' ');
			if (inputArgs.Length == 0 )
			{
				throw new ArgumentException($"Input {pInput} is not in a valid format.");
			}

			string cmd = inputArgs[0];
			string arg = "";
			if (inputArgs.Length > 1)
			{
				arg = inputArgs[1];
			}

			return new(cmd, arg);
		}

		// Only BitdCharSheets supported for now
		private static BitdCharSheet CreateSheet(string pName)
		{
			if (string.IsNullOrWhiteSpace(pName))
			{
				throw new Exception($"No name given for character sheet.");
			}
			return new()
			{
				Id = Guid.NewGuid(),
				Name = pName,
				DateCreated = DateTime.Now,
				DateLastModified = DateTime.Now
			};
		}

		private static void DeleteSheet(string pId)
		{
			SheetSaveManager.Delete(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet, Guid.Parse(pId));
		}

		private static ICollection<SheetMetaData> FetchAll()
		{
			return SheetSaveManager.GetAllSheetMetaData(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet);
		}

		private static void DisplayMetaDataList(ICollection<SheetMetaData> allMetaData)
		{
			Console.WriteLine("All Sheets: ");
			foreach (SheetMetaData s in allMetaData)
			{
				Console.WriteLine($"- {s.Name}");
				Console.WriteLine($"\tId: {s.Id}");
				Console.WriteLine($"\tDate Created: {s.DateCreated}");
				Console.WriteLine($"\tDate Modified: {s.DateLastModified}");
			}
		}

		private static BitdCharSheet LoadSheet(string pId)
		{
			return SheetSaveManager.Load(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet, Guid.Parse(pId)) ?? throw new Exception($"Could not find sheet with id {pId}.");
		}

		private static void SaveSheet()
		{
			if (_charSheet is null)
			{
				throw new Exception($"No character sheet created or loaded.");
			}

			SheetSaveManager.Save(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet, _charSheet);
		}

		private static void UpdateSheet(string pArgs)
		{
			if (_charSheet is null)
			{
				throw new Exception($"No character sheet created or loaded.");
			}

			string[] argSplit = pArgs.Split(',');
            foreach (string subArg in argSplit) 
            {
				string[] subArgSplit = subArg.Split(":");
				if (subArgSplit.Length == 0)
				{
					continue;
				}

				string field = subArgSplit[0];
				if (subArg.Length == 1)
				{
					continue;
				}
				string value = subArgSplit[1];
				UpdateSheetField(_charSheet, field, value);
            }

            SheetSaveManager.Save(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharPlaybook, _charSheet);
		}

		private static void UpdateSheetField(BitdCharSheet pSheet, string pField, string pValue)
		{
			switch (pField.ToUpper())
			{
				case "NAME":
					pSheet.Name = pValue;
					break;
			}
		}

		private static ICollection<BitdCharPlaybook> GetAllPlaybooks()
		{
			return [.. Repo.CharPlaybooks];
		}

		private static void DisplayAllPlaybooks()
		{
			if (_allCharPlaybooks is null)
			{
				throw new Exception("No char playbooks loaded.");
			}

			Console.WriteLine("All Char Playbooks: ");
			foreach (BitdCharPlaybook s in _allCharPlaybooks)
			{
				Console.WriteLine(PlaybookToString(s));
			}
		}

		private static string PlaybookToString(BitdCharPlaybook pPb)
		{
			StringBuilder sb = new();

			sb.AppendLine($"- {pPb.Id}: {pPb.Name}, {pPb.SubName}.");
			sb.AppendLine($"Actions: {string.Join(", ", pPb.StartingActions)}");

			sb.AppendLine($"Builds: ");
			foreach (var build in pPb.StartingBuilds.Values)
			{
				sb.AppendLine($"\t- {build.Id}: {build.Name} - {build.StartingSpecialAbilityId}, {string.Join(", ", build.BonusActions)}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Special Abilities: ");
			sb.AppendLine($"Default: {pPb.DefaultSpecialAbilityId}, Starting: {pPb.StartingSpecialAbilityId}");
			foreach (var sp in pPb.SpecialAbilities.Values)
			{
				sb.AppendLine($"\t- {sp.Id}: {sp.Name} - {sp.Text} - {sp.NbrOfBoxes}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Contacts: ");
			foreach (var sp in pPb.Contacts.Values)
			{
				sb.AppendLine($"\t- {sp.Id}: {sp.Name}, {sp.Text}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Items: ");
			foreach (var sp in pPb.Items.Values)
			{
				sb.AppendLine($"\t- {sp.Id}: {sp.Name} - {sp.Text} - {sp.Loadout}");
			}
			sb.AppendLine("----------");

			return sb.ToString();
		} 
	}
}