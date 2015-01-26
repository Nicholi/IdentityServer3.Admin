using System;
using System.Collections.Generic;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence
{
    /// <summary>
    /// Returns a paged list of <see cref="TEntity"/>
    /// </summary>
    /// <typeparam name="TEntity"></typeparam>
    public class PageResult<TEntity>
    {
        private int _totalCount;
        
        public IEnumerable<TEntity> Items { get; set; }

        public int TotalCount
        {
            get { return _totalCount; }
            set
            {
                if (value < 0)
                {
                    throw new ArgumentOutOfRangeException("value", "TotalCount can't be less than zero.");
                }

                _totalCount = value;
            }
        }
    }
}