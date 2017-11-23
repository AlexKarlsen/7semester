using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Options;
using Stockmanager.Interfaces;
using Stockmanager.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Repositories
{
    public class Repository<IEntity> : IRepository<IEntity> where IEntity : class
    {
        protected readonly DbContext Context;

        public Repository(StockmanagerContext context)
        {
            Context = context;
        }

        public async Task<EntityEntry> AddAsync(IEntity entity)
        {
            var x = await Context.Set<IEntity>().AddAsync(entity);
            await Context.SaveChangesAsync();
            return x;
        }

        public async Task DeleteAsync(IEntity entity)
        {
            Context.Set<IEntity>().Remove(entity);
            await Context.SaveChangesAsync();
        }

        public async Task<IEnumerable<IEntity>> GetAllAsync()
        {
            return await Context.Set<IEntity>().ToListAsync();
        }

        public async Task<IEntity> GetOneAsync(long id)
        {
            return await Context.Set<IEntity>().FindAsync(id);
        }

        public async Task UpdateAsync(IEntity entity)
        {
            Context.Set<IEntity>().Update(entity);
            await Context.SaveChangesAsync();
        }
    }
}
