using TempHumiditySensor.Model;

namespace TempHumiditySensor.Repo
{
    public interface IDataRepo
    {
        public Task<TempHumidity> AddAsync(int temp, int humidity);
        public Task<List<TempHumidity>> GetAllAsync();
    }
}
