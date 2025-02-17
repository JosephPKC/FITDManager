using System.Text;

using LogWrapper.Loggers.Log4Net.ColorConsole;

using DataGateway;
using DataGateway.RefGateway;
using DataGateway.SheetGateway;
using EntityMapper.Bitd;
using FitdCoreEntity.Bitd;
using LiteDbAdapter;
using RefRepo;
using SheetManager;
using GistBuilder.SheetGists;

namespace FitdTester
{
    public class Program
	{
		private static readonly string _dbPath = "test.db";
		private static readonly string _dbRefPath = "FitdRefDb.db";

		#region "Adapters"
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
		#endregion

		#region "Gateways"
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
		#endregion

		#region "Mappers"
		private static IBitdCharPlaybookMapper? _charPlaybookMapper = null;
		private static IBitdCharPlaybookMapper CharPlaybookMapper {
			get
			{
				if (_charPlaybookMapper is not null)
				{
					return _charPlaybookMapper;
				}

				_charPlaybookMapper = BitdMapperFactory.CreateNewCharPlaybookMapper();
				return _charPlaybookMapper;
			}
		}

		private static IBitdCrewPlaybookMapper? _crewPlaybookMapper = null;
		private static IBitdCrewPlaybookMapper CrewPlaybookMapper {
			get
			{
				if (_crewPlaybookMapper is not null)
				{
					return _crewPlaybookMapper;
				}

				_crewPlaybookMapper = BitdMapperFactory.CreateNewCrewPlaybookMapper();
				return _crewPlaybookMapper;
			}
		}

		private static IBitdCharSheetMapper? _charSheetMapper = null;
		private static IBitdCharSheetMapper CharSheetMapper {
			get
			{
				if (_charSheetMapper is not null)
				{
					return _charSheetMapper;
				}

				_charSheetMapper = BitdMapperFactory.CreateNewCharSheetMapper();
				return _charSheetMapper;
			}
		}
		#endregion

		#region "Other"
		private static ISheetSaveManager<BitdCharSheetEntity>? _sheetSaveManager = null;
		private static ISheetSaveManager<BitdCharSheetEntity> SheetSaveManager {
			get
			{
				if (_sheetSaveManager is not null)
				{
					return _sheetSaveManager;
				}

				_sheetSaveManager = SheetManagerFactory.CreateNewSheetSaveManager(SheetGateway, CharSheetMapper);
				return _sheetSaveManager;
			}
		}

		private static IBitdRepo? _repo = null;
		private static IBitdRepo Repo {
			get
			{
				if (_repo is not null)
				{
					return _repo;
				}

				_repo = (IBitdRepo)RepoFactory.CreateNewRepo(RefGateway, FitdConfig.GameTypes.BitD, CharPlaybookMapper, CrewPlaybookMapper);
				return _repo;
			}
		}
		#endregion

		#region "Temporary State"
		private static BitdCharSheetEntity? _charSheet = null;
		private static ICollection<BitdCharPlaybookEntity> _allCharPlaybooks = [];
		#endregion

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
					ICollection<SheetGist> allMetaData = FetchAll();
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
		private static BitdCharSheetEntity CreateSheet(string pName)
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
			if (pId.Equals("A", StringComparison.CurrentCultureIgnoreCase))
			{
				DeleteAllSheets();
				return;
			}
			SheetSaveManager.Delete(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet, Guid.Parse(pId));
		}

		private static void DeleteAllSheets()
		{
			SheetSaveManager.Clear(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet);
		}

		private static ICollection<SheetGist> FetchAll()
		{
			return SheetSaveManager.GetAllSheetMetaData(FitdConfig.GameTypes.BitD, FitdConfig.EntityTypes.CharSheet);
		}

		private static void DisplayMetaDataList(ICollection<SheetGist> allMetaData)
		{
			Console.WriteLine("All Sheets: ");
			foreach (SheetGist s in allMetaData)
			{
				Console.WriteLine($"- {s.Name}");
				Console.WriteLine($"\tId: {s.Id}");
				Console.WriteLine($"\tDate Created: {s.DateCreated}");
				Console.WriteLine($"\tDate Modified: {s.DateLastModified}");
			}
		}

		private static BitdCharSheetEntity LoadSheet(string pId)
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

		private static void UpdateSheetField(BitdCharSheetEntity pSheet, string pField, string pValue)
		{
			switch (pField.ToUpper())
			{
				case "NAME":
					pSheet.Name = pValue;
					break;
			}

			pSheet.DateLastModified = DateTime.Now;
		}

		private static ICollection<BitdCharPlaybookEntity> GetAllPlaybooks()
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
			foreach (BitdCharPlaybookEntity s in _allCharPlaybooks)
			{
				Console.WriteLine(PlaybookToString(s));
			}
		}

		private static string PlaybookToString(BitdCharPlaybookEntity pPb)
		{
			StringBuilder sb = new();

			sb.AppendLine($"- {pPb.Id}: {pPb.Name}, {pPb.SubName}.");
			sb.AppendLine($"Actions: {string.Join(", ", pPb.StartingActions)}");

			sb.AppendLine($"Builds: ");
			foreach (var build in pPb.StartingBuilds)
			{
				sb.AppendLine($"\t- {build.Value.Id}: {build.Value.Name} - {build.Value.StartingSpecialAbilityId}, {string.Join(", ", build.Value.BonusActions)}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Special Abilities: ");
			sb.AppendLine($"Default: {pPb.DefaultSpecialAbilityId}, Starting: {pPb.DefaultSpecialAbilityId}");
			foreach (var sp in pPb.SpecialAbilities)
			{
				sb.AppendLine($"\t- {sp.Value.Id}: {sp.Value.Name} - {sp.Value.Text} - {sp.Value.NbrOfBoxes}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Contacts: ");
			foreach (var sp in pPb.Contacts)
			{
				sb.AppendLine($"\t- {sp.Value.Id}: {sp.Value.Name}, {sp.Value.Text}");
			}
			sb.AppendLine("----------");

			sb.AppendLine($"Items: ");
			foreach (var sp in pPb.Items)
			{
				sb.AppendLine($"\t- {sp.Value.Id}: {sp.Value.Name} - {sp.Value.Text} - {sp.Value.Loadout}");
			}
			sb.AppendLine("----------");

			return sb.ToString();
		} 
	}
}