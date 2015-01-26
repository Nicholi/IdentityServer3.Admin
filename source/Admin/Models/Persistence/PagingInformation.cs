using System;
using System.Collections.Generic;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence
{
    /// <summary>
    /// Paging information for getting a paged result of items.
    /// </summary>
    public class PagingInformation
    {
        private int _skip;
        private int _take;
        private IList<SortColumn> _sortColumns;

        /// <summary>
        /// Items to skip
        /// </summary>
        public int Skip
        {
            get { return _skip; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException("value", "Skip can't be less than zero.");
                }

                _skip = value;
            }
        }

        /// <summary>
        /// Items to take
        /// </summary>
        public int Take
        {
            get { return _take; }
            set
            {
                if (value < 1)
                {
                    throw new ArgumentOutOfRangeException("value", "Take can't be less than one.");
                }

                _take = value;
            }
        }

        /// <summary>
        /// A search term. Implementations can decide where to use the search term for searching.
        /// </summary>
        public string SearchTerm { get; set; }

        /// <summary>
        /// List of sortable columns. Implementations should support multi column sorting. Ordered by priority from highest to lowest.
        /// </summary>
        public IList<SortColumn> SortColumns
        {
            get { return _sortColumns ?? (_sortColumns = new List<SortColumn>()); }
            set { _sortColumns = value; }
        }
    }
}