using System.Collections.Generic;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage
{
    public class Scope
    {
        public virtual int Id { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual string Name { get; set; }
        public virtual string DisplayName { get; set; }
        public virtual string Description { get; set; }
        public virtual bool Required { get; set; }
        public virtual bool Emphasize { get; set; }
        public virtual int Type { get; set; }
        public virtual ICollection<ScopeClaim> ScopeClaims { get; set; }
        public virtual bool IncludeAllClaimsForUser { get; set; }
        public virtual string ClaimsRule { get; set; }
        public virtual bool ShowInDiscoveryDocument { get; set; }

        public Scope()
        {
            // Copied from original Scope model

            IncludeAllClaimsForUser = false;
            Enabled = true;
            ShowInDiscoveryDocument = true;
        }
    }
}