using Stockmanager.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Interfaces
{
    public interface IComponentTypeRepository : IRepository<ComponentType>
    {
        Task<IEnumerable> ListComponentTypesForACategory(long categoryId);
    }
}
