using Stockmanager.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Interfaces
{
    interface ICategoryRepository : IRepository<Category>
    {
        IEnumerable ListComponents(Category category);
    }
}
