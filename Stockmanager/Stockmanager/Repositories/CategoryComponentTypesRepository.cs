using Stockmanager.Models;
using Stockmanager.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Repositories
{
    public class CategoryComponentTypesRepository : Repository<CategoryComponentType>, ICategoryComponentTypesRepository
    {
        public CategoryComponentTypesRepository(StockmanagerContext context) : base(context)
        {
        }
    }
}
