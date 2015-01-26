using System.Web.Http;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Dto;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Controllers
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
                ClientStoreTotalCount = _clientStore.TotalCount(),
                ScopeStoreTotalCount = _scopeStore.TotalCount()
            };

            return Ok(result);
        }
    }
}