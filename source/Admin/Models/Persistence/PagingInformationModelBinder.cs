using System;
using System.Collections.Generic;
using System.Web.Http.Controllers;
using System.Web.Http.ModelBinding;
using Newtonsoft.Json;

namespace Thinktecture.IdentityServer3.Admin.Models.Persistence
{
    // TODO: Review this, maybe we should move paging information to body? (but it is a http get request), mh 
    /// <summary>
    /// Reads the paging information form the url. 
    /// </summary>
    public class PagingInformationModelBinder : IModelBinder
    {
        private static JsonSerializerSettings _jsonSerializerSettings = new JsonSerializerSettings()
        {
            ContractResolver = new InternalPropertyContractResolver()
        };

        public bool BindModel(HttpActionContext actionContext, ModelBindingContext bindingContext)
        {
            if (bindingContext.ModelType != typeof (PagingInformation))
            {
                return false;
            }

            var pagingInformation = new PagingInformation();

            pagingInformation.Skip = Convert.ToInt32(GetValueOrNull(bindingContext, "Skip"));
            pagingInformation.Take = Convert.ToInt32(GetValueOrNull(bindingContext, "Take"));
            pagingInformation.SearchTerm = Convert.ToString(GetValueOrNull(bindingContext, "SearchTerm"));

            var sortColumns = Convert.ToString(GetValueOrNull(bindingContext, "SortColumns"));

            if (!String.IsNullOrWhiteSpace(sortColumns))
            {
                pagingInformation.SortColumns = ExtractSortColumnsFromString("[" + sortColumns + "]");
            }

            bindingContext.Model = pagingInformation;

            return true;
        }

        private object GetValueOrNull(ModelBindingContext bindingContext, string keyName)
        {
            var result = bindingContext.ValueProvider.GetValue(keyName);

            return result != null ? result.AttemptedValue : null;
        }

        private IList<SortColumn> ExtractSortColumnsFromString(string input)
        {
            try
            {
                return JsonConvert.DeserializeObject<List<SortColumn>>(input, _jsonSerializerSettings);
            }
            catch
            {
                return null;
            }
        }
    }
}