using Stockmanager.Interfaces;
using Stockmanager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections;

namespace Stockmanager.Repositories
{
    public class CategoryRepository : Repository<Category>, ICategoryRepository
    {
        public IEnumerable ListComponents(Category category)
        {
            throw new NotImplementedException();
        }
    }
}
