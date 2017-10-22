using Microsoft.EntityFrameworkCore;
using Stockmanager.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Repositories
{
    public class Repository<IEntity> : IRepository<IEntity> where IEntity : class
    {
        protected readonly DbContext Context;

        public void Add(IEntity entity)
        {
            Context.Set<IEntity>().Add(entity);
        }

        public void Delete(IEntity entity)
        {
            Context.Set<IEntity>().Remove(entity);
        }

        public void Update(IEntity entity)
        {
            Context.Set<IEntity>().Update(entity);
        }
    }
}
