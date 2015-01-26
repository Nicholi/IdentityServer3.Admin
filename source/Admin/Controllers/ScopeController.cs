using System.Net;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Persistence;
using Thinktecture.IdentityServer3.Admin.WebApi.Models.Storage;
using Thinktecture.IdentityServer3.Admin.WebApi.Storage;

namespace Thinktecture.IdentityServer3.Admin.WebApi.Controllers
{
	public class ScopeController : ApiController
	{
		private readonly ScopeStore _scopeStore;

		public ScopeController(ScopeStore scopeStore)
		{
			_scopeStore = scopeStore;
		}

		[HttpGet]
		public IHttpActionResult List([ModelBinder(typeof(PagingInformationModelBinder))] PagingInformation pagingInformation)
		{
			return Ok(_scopeStore.List(pagingInformation));
		}

		[HttpGet]
		public IHttpActionResult Get(int key)
		{
		    var result = _scopeStore.Get(key);

		    if (result == null)
		    {
		        return NotFound();
		    }

			return Ok(result);
		}

		[HttpPost]
		public IHttpActionResult Add(Scope scope)
		{
            // TODO: Validation
			var newId = _scopeStore.Add(scope);

		    return Ok(newId);
		}

		[HttpPut]
		public IHttpActionResult Update(Scope scope)
		{
            // TODO: Validation
			_scopeStore.Update(scope);

            return StatusCode(HttpStatusCode.NoContent);
		}

		[HttpDelete]
		public IHttpActionResult Delete(int key)
		{
			_scopeStore.Delete(key);

            return StatusCode(HttpStatusCode.NoContent);
		}

        [HttpGet]
	    public IHttpActionResult TotalCount()
	    {
	        var totalCount = _scopeStore.TotalCount();

	        return Ok(totalCount);
	    }
	}
}