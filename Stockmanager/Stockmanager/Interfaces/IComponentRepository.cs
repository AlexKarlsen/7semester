using Stockmanager.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Interfaces
{
    public interface IComponentRepository : IRepository<Component>
    {
        Task<IEnumerable> ListComponentsForAComponentType(long componentTypeId);
    }
}
