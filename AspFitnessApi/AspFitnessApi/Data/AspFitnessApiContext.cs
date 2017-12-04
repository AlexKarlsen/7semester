using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AspFitnessApi.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace AspFitnessApi.Models
{
    public class AspFitnessApiContext : IdentityDbContext
    {
        public AspFitnessApiContext (DbContextOptions<AspFitnessApiContext> options)
            : base(options)
        {
        }

        public DbSet<AspFitnessApi.Models.Workout> Workout { get; set; }

        public DbSet<AspFitnessApi.Models.Exercise> Exercise { get; set; }

        public DbSet<AspFitnessApi.Models.ApplicationUser> ApplicationUser { get; set; }
    }
}
