using LogosAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace LogosAPI.Data
{
        public class ApiContext : DbContext
        {

            public DbSet<Issues> Issues { get; set; }
            public DbSet<PlannedMaintenance> PlannedMaintenance { get; set; }

            public ApiContext(DbContextOptions<ApiContext> options) : base(options)
            {

            }
        }
}
