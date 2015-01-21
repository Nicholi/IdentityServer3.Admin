namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Persistence
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

        internal UiGridSortDirection UiGridSortDirection
        {
            get
            {
                if (SortDirection == SortDirection.Ascending)
                {
                    return UiGridSortDirection.ASC;
                }

                return UiGridSortDirection.DESC;
            }
            set
            {
                if (value == UiGridSortDirection.ASC)
                {
                    SortDirection = SortDirection.Ascending;
                    return;
                }

                SortDirection = SortDirection.Descending;
            }
        }
    }
}