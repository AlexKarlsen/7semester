using Stockmanager.Interfaces;
using Stockmanager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace Stockmanager.Repositories
{
    public class ComponentRepository : Repository<Component>, IComponentRepository
    {
        public ComponentRepository(StockmanagerContext context) : base(context)
        {

        }

        public async Task<IEnumerable> ListComponentsForAComponentType(long componentTypeId)
        {
            return await Context.Set<Component>().Where(m => m.ComponentTypeId == componentTypeId).ToListAsync();
        }
    }
}
