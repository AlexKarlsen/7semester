using Microsoft.EntityFrameworkCore;
using Stockmanager.Models;

namespace Stockmanager.Models
{
    public class StockmanagerContext : DbContext
    {
        public StockmanagerContext (DbContextOptions<StockmanagerContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CategoryComponentType>()
                .HasKey(t => new { t.CategoryId, t.ComponentTypeId });

            modelBuilder.Entity<CategoryComponentType>()
                .HasOne(pt => pt.Category)
                .WithMany(p => p.CategoryComponentType)
                .HasForeignKey(pt => pt.CategoryId);

            modelBuilder.Entity<CategoryComponentType>()
                .HasOne(pt => pt.ComponentType)
                .WithMany(t => t.CategoryComponentType)
                .HasForeignKey(pt => pt.ComponentTypeId);
        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Component> Component { get; set; }

        public DbSet<Stockmanager.Models.ComponentType> ComponentType { get; set; }

        public DbSet<CategoryComponentType> CategoryComponentType { get; set; }
    }
}
