namespace Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage
{
    public class ClientScopeRestriction
    {
        public virtual int Id { get; set; }
        public virtual string Scope { get; set; }
        public virtual Client Client { get; set; }
    }
}