/*
 * Copyright 2014 Dominick Baier, Brock Allen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

using System;
using System.Configuration;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Infrastructure;
using Thinktecture.IdentityServer3.Admin.Resources;

namespace Thinktecture.IdentityServer3.Admin.Configuration.Security.RemoteAuthenticationMiddleware
{
    public class RemoteAuthenticationHandler : AuthenticationHandler<RemoteAuthenticationOptions>
    {
        private string[] _whitelistedRemoteHosts;

        public RemoteAuthenticationHandler()
        {
            ReadConfigurationFromWebConfig();
        }

        private void ReadConfigurationFromWebConfig()
        {
            var remoteHostString = ConfigurationManager.AppSettings[Constants.RemoteHostAuthenticationConfigurationKey];

            if (String.IsNullOrWhiteSpace(remoteHostString))
            {
                throw new ConfigurationErrorsException("No configuration found for " + Constants.RemoteHostAuthenticationConfigurationKey);
            }

            var hosts = remoteHostString.Split(',');

            if (hosts.Length == 0)
            {
                throw new ConfigurationErrorsException("No whitelisted remote hosts found for " + Constants.RemoteHostAuthenticationConfigurationKey);
            }

            _whitelistedRemoteHosts = hosts;
        }

        protected override Task<Microsoft.Owin.Security.AuthenticationTicket> AuthenticateCoreAsync()
        {
            var ctx = this.Context;
            if (_whitelistedRemoteHosts.Contains(ctx.Request.RemoteIpAddress) || _whitelistedRemoteHosts.Contains(ctx.Request.Host.Value))
            {
                var id = new ClaimsIdentity(Constants.LocalAuthenticationType, Constants.ClaimTypes.Name, Constants.ClaimTypes.Role);
                id.AddClaim(new Claim(Constants.ClaimTypes.Name, Messages.LocalUsername));
                id.AddClaim(new Claim(Constants.ClaimTypes.Role, this.Options.RoleToAssign));

                var ticket = new AuthenticationTicket(id, new AuthenticationProperties());
                return Task.FromResult(ticket);
            }

            return Task.FromResult<AuthenticationTicket>(null);
        }
    }
}
