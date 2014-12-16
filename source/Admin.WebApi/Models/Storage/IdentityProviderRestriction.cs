namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Storage
{
    public class IdentityProviderRestriction
    {
        public virtual int Id { get; set; }
        public virtual string Provider { get; set; }
        public virtual Client Client { get; set; }
    }
}