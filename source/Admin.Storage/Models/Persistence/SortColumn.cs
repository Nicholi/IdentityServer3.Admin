namespace Thinktecture.IdentityServer.v3.Admin.Storage.Models.Persistence
{
    public class SortColumn
    {
        /// <summary>
        /// Name of column (property) used for sorting
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Sort direction of the given name, either ascending or descending
        /// </summary>
        public SortDirection SortDirection { get; set; }
    }
}