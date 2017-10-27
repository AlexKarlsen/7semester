using Stockmanager.Interfaces;
using Stockmanager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public CategoryRepository(StockmanagerContext context) : base(context)
        {

        }
    }
}
