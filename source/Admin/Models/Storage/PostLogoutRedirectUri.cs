namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Storage
{
    public class PostLogoutRedirectUri
    {
        public virtual int Id { get; set; }
        public virtual string Uri { get; set; }
        public virtual Client Client { get; set; }
    }
}