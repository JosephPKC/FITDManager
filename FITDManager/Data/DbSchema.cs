namespace FITDManager.Data
{
    public static class DbSchema
    {
        public enum DbCols
        {
            // Shared/Common Cols

            // BitD Cols
            BitD_Playbooks,

            // SaV Cols
            SaV_Playbooks
        }

        public class Schema 
        {
            public string ColName { get; set; } = string.Empty;
        }

        public static readonly Dictionary<DbCols, Schema> SchemaMap = new()
        {
            {
                DbCols.BitD_Playbooks, new Schema()
                {
                    ColName = "BitD_Playbooks"
                }
            },
            {
                DbCols.SaV_Playbooks, new Schema()
                {
                    ColName = "SaV_Playbooks"
                }
            }
        };
    }
}
