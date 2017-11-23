using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AspFitnessApi.Models;

namespace AspFitnessApi.Models
{
    public class AspFitnessApiContext : DbContext
    {
        public AspFitnessApiContext (DbContextOptions<AspFitnessApiContext> options)
            : base(options)
        {
        }

        public DbSet<AspFitnessApi.Models.Workout> Workout { get; set; }

        public DbSet<AspFitnessApi.Models.Exercise> Exercise { get; set; }
    }
}
