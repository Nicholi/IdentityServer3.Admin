using System.Web.Http;
using Thinktecture.IdentityServer3.Admin.Models.Dto;
using Thinktecture.IdentityServer3.Admin.Storage;

namespace Thinktecture.IdentityServer3.Admin.Controllers
{
    public class DashboardController : ApiController
    {
        private readonly ScopeStore _scopeStore;
        private readonly ClientStore _clientStore;

        public DashboardController(ScopeStore scopeStore, ClientStore clientStore)
        {
            _scopeStore = scopeStore;
            _clientStore = clientStore;
        }

        [HttpGet]
        public IHttpActionResult TotalCounts()
        {
            var result = new DashboardDto()
            {
                ClientsTotalCount = _clientStore.TotalCount(),
                ScopesTotalCount = _scopeStore.TotalCount()
            };

            return Ok(result);
        }
    }
}