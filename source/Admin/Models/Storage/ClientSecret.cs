using System;

namespace Thinktecture.IdentityServer3.Admin.Models.Storage
{
    public class ClientSecret
    {
        public string Description { get; set; }
        public string Value { get; set; }
        public DateTimeOffset? Expiration { get; set; } 
    }
}