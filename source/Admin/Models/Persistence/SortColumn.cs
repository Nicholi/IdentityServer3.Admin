namespace Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence
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

        /// <summary>
        /// Only used for internal mapping. Implementations should not deal with AngularJS constants.
        /// </summary>
        internal UiGridSortDirection UiGridSortDirection
        {
            get
            {
                if (SortDirection == SortDirection.Ascending)
                {
                    return UiGridSortDirection.asc;
                }

                return UiGridSortDirection.desc;
            }
            set
            {
                if (value == UiGridSortDirection.asc)
                {
                    SortDirection = SortDirection.Ascending;
                    return;
                }

                SortDirection = SortDirection.Descending;
            }
        }
    }
}