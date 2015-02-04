using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Thinktecture.IdentityServer3.Admin.Models.Persistence
{
    /// <summary>
    /// Used for serializing internal properties.
    /// Useful for <see cref="SortColumn"/> which should not expose <see cref="UiGridSortDirection"/>
    /// </summary>
    internal class InternalPropertyContractResolver : DefaultContractResolver
    {
        protected override List<MemberInfo> GetSerializableMembers(Type objectType)
        {
            var flags = BindingFlags.Instance | BindingFlags.Public | BindingFlags.NonPublic;
            MemberInfo[] fields = objectType.GetFields(flags);
            return fields
                .Concat(objectType.GetProperties(flags).Where(propInfo => propInfo.CanWrite))
                .ToList();
        }

        protected override IList<JsonProperty> CreateProperties(Type type, MemberSerialization memberSerialization)
        {
            return base.CreateProperties(type, MemberSerialization.Fields);
        }     
    }
}