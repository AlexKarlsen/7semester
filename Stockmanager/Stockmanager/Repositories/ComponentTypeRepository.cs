using Stockmanager.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Stockmanager.Models;
using System.Collections;

namespace Stockmanager.Repositories
{
    public class ComponentTypeRepository : Repository<ComponentType>, IComponentTypeRepository
    {
        public IEnumerable ListComponent(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
