using FITDManager.Data.Models.BitD;
using JSONWrapper;
using LiteDbWrapper;

using static FITDManager.Data.DbSchema;

namespace FITDUpdater
{
    public sealed class FITDUpdater
    {
        private readonly LiteDb _db;

        public FITDUpdater()
        {
            _db = new("../../../../FitdDb.db");
        }

        public void UpdateBitD()
        {
            // Update all playbooks?
            UpdateBitDPlaybooks();
        }

        private void UpdateBitDPlaybooks()
        {
            string colName = SchemaMap[DbCols.BitD_Playbooks].ColName;
            _db.DeleteAll<BitdPlaybookModel>(colName);
            _db.Create(colName);

            IEnumerable<BitdPlaybookModel> data = JSONUtil.Deserialize<IEnumerable<BitdPlaybookModel>>(@"../../../Data/BitD_Playbooks.json") ?? [];
            IEnumerable<BitdPlaybookModel> playbooks = data.Skip(1); // Skip first as it is a shared model.
            foreach (BitdPlaybookModel playbook in playbooks)
            {
				_ = playbook.SpecialAbilities.Append(data.First().SpecialAbilities.First());
            }
            _db.Insert(colName, playbooks);
        }
    }
}
