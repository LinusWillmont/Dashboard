using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using TempHumiditySensor.Model;

namespace TempHumiditySensor.Data
{
    public class DataContext : DbContext
    {

        public DbSet<TempHumidity> dataPackage { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
