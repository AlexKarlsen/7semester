using Stockmanager.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stockmanager.Models;
using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace Stockmanager.Repositories
{
    public class ComponentTypeRepository : Repository<ComponentType>, IComponentTypeRepository
    {
        public ComponentTypeRepository(StockmanagerContext context) : base(context)
        {

        }

        public async Task<IEnumerable> ListComponentTypesForACategory(long categoryId)
        {
            return await Context.Set<CategoryComponentType>().Include(c => c.ComponentType).Where(Ca => Ca.CategoryId == categoryId).Select(c => c.ComponentType).ToListAsync();
        }
    }
}
