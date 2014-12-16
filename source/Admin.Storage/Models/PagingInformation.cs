using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Thinktecture.IdentityServer.v3.Admin.Storage.Models
{
    public class PagingInformation
    {
        private int _skip;
        private int _take;
        private ICollection<SortColumn> _sortColumns;

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

        public string SearchTerm { get; set; }

        public ICollection<SortColumn> SortColumns
        {
            get { return _sortColumns ?? (_sortColumns = new Collection<SortColumn>()); }
            set { _sortColumns = value; }
        }
    }
}