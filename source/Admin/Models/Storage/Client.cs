using System.Collections.Generic;
using Thinktecture.IdentityServer.Core.Models;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Storage
{
    public class Client
    {
        public virtual int Id { get; set; }
        public virtual bool Enabled { get; set; }
        public virtual string ClientId { get; set; }
        public virtual string ClientSecret { get; set; }
        public virtual string ClientName { get; set; }
        public virtual string ClientUri { get; set; }
        public virtual string LogoUri { get; set; }
        public virtual bool RequireConsent { get; set; }
        public virtual bool AllowRememberConsent { get; set; }
        public virtual Flows Flow { get; set; }
        public virtual ICollection<ClientRedirectUri> RedirectUris { get; set; }
        public virtual ICollection<ClientPostLogoutRedirectUri> PostLogoutRedirectUris { get; set; }
        public virtual ICollection<ClientScopeRestriction> ScopeRestrictions { get; set; }
        public virtual int IdentityTokenLifetime { get; set; }
        public virtual int AccessTokenLifetime { get; set; }
        public virtual int AuthorizationCodeLifetime { get; set; }
        public virtual int AbsoluteRefreshTokenLifetime { get; set; }
        public virtual int SlidingRefreshTokenLifetime { get; set; }
        public virtual TokenUsage RefreshTokenUsage { get; set; }
        public virtual TokenExpiration RefreshTokenExpiration { get; set; }
        public virtual SigningKeyTypes IdentityTokenSigningKeyType { get; set; }
        public virtual AccessTokenType AccessTokenType { get; set; }
        public virtual bool AllowLocalLogin { get; set; }
        public virtual ICollection<ClientIdPRestriction> IdentityProviderRestrictions { get; set; }
        public virtual bool IncludeJwtId { get; set; }
    }
}