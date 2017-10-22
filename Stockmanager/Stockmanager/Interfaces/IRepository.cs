using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Interfaces
{
    interface IRepository<IEntity> where IEntity : class
    {
        void Add(IEntity entity);
        void Update(IEntity entity);

        // Not sure to implement update at this level?
        void Delete(IEntity entity);
    }
}
