using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Stockmanager.Interfaces
{
    public interface IRepository<IEntity> where IEntity : class
    {
        Task<IEntity> GetOneAsync(long id);
        Task<IEnumerable<IEntity>> GetAllAsync();
        Task<EntityEntry> AddAsync(IEntity entity);

        // Not sure to implement update at this level?
        Task UpdateAsync(IEntity entity);
        Task DeleteAsync(IEntity entity);
    }
}
