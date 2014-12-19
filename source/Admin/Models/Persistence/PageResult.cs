using System;
using System.Collections.Generic;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Persistence
{
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