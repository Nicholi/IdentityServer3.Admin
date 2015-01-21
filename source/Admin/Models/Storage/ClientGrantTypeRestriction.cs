using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Storage
{
    public class ClientGrantTypeRestriction
    {
        public virtual int Id { get; set; }
        public virtual string GrantType { get; set; }
        public virtual Client Client { get; set; }
    }
}
