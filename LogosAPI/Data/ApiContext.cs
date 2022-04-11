using LogosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LogosAPI.Data
{
        public class ApiContext : DbContext
        {

            public DbSet<Issues> Issues { get; set; }
            public DbSet<PlannedMaintenance> PlannedMaintenance { get; set; }

            public DbSet<User> Users { get; set; }

            public ApiContext(DbContextOptions<ApiContext> options) : base(options)
            {
                
            }

            protected override void OnModelCreating(ModelBuilder builder)
            {
                /*builder.Entity<User>()
                    .HasIndex(u =>  u.UserName)
                    .IsUnique(true);*/
            }
        }
}
