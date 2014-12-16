using System.Web.Http;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Persistence;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer.v3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer.v3.Admin.WebApi.Controllers
{
	public class ScopeController : ApiController
	{
		private readonly ScopeStore _scopeStore;

		public ScopeController(ScopeStore scopeStore)
		{
			_scopeStore = scopeStore;
		}

		[HttpGet]
		public IHttpActionResult List([FromUri] PagingInformation pagingInformation)
		{
			return Ok(_scopeStore.List(pagingInformation));
		}

		[HttpGet]
		public IHttpActionResult Get(int key)
		{
			return Ok(_scopeStore.Get(key));
		}

		[HttpPost]
		public IHttpActionResult Add()
		{
			// TODO: Add Web API Scope model as parameter and map it
			_scopeStore.Add(new Scope());

			return Ok();
		}

		[HttpPut]
		public IHttpActionResult Update()
		{
			// TODO: Add Web API Scope model as parameter and map it
			_scopeStore.Update(new Scope());

			return Ok();
		}

		[HttpDelete]
		public IHttpActionResult Delete([FromBody] int key)
		{
			_scopeStore.Delete(key);

			return Ok();
		}
	}
}