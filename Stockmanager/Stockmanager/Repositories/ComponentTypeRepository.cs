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
            return null;
            //return await Context.Set<ComponentType>().Select(m => m.Categories.Where(c => c.CategoryId == categoryId)).ToListAsync();
        }
    }
}
