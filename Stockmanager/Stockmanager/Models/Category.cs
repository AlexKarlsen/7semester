using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Models
{
    public class Category
    {
        public Category()
        {
            CategoryComponentType = new List<CategoryComponentType>();
        }

        public long CategoryId { get; set; }
        public string Name { get; set; }
        public ICollection<CategoryComponentType> CategoryComponentType { get; protected set; }

    }
}