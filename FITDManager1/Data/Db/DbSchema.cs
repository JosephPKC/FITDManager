namespace FITDManager.Data.Db
{
    public static class DbSchema
    {
        public enum DbCols
        {

        }

        public class Schema
        {
            public string ColName { get; set; } = string.Empty;
        }

        public static readonly Dictionary<DbCols, Schema> SchemaMap = new()
        {

        };
    }
}
