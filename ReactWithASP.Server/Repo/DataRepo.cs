using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using TempHumiditySensor.Data;
using TempHumiditySensor.Model;

namespace TempHumiditySensor.Repo
{
    public class DataRepo : IDataRepo
    {
        private DataContext _db;
        public DataRepo(DataContext db)
        {
            _db = db;
        }

        public async Task<TempHumidity> AddAsync(int temp, int humidity)
        {
            var newData = await _db.dataPackage.AddAsync(new TempHumidity { Temp = temp, Humidity = humidity });
            await _db.SaveChangesAsync();
            return newData.Entity;
        }
        public async Task<List<TempHumidity>> GetAllAsync()
        {
            return await _db.dataPackage.ToListAsync();
        }
    }
}
