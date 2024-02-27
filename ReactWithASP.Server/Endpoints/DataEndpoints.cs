using System.Net.Http.Headers;
using TempHumiditySensor.DTOs;
using TempHumiditySensor.Repo;

namespace TempHumiditySensor.Endpoints
{
    public static class DataEndpoints
    {
        public static void ConfigureDataEndpoints(this WebApplication app)
        {
            var data = app.MapGroup("/data");
            data.MapPost("", AddData);
            data.MapGet("", GetAllData);
        }

        public static async Task<IResult> AddData(IDataRepo repo, DataSendPayload payload)
        {
            Console.WriteLine($"Received payload - Temp: {payload.temp}, Humidity: {payload.humidity}");

            var newData = await repo.AddAsync(payload.temp, payload.humidity);
            return TypedResults.Created($"data/{newData.Id}", newData);

        }

        public static async Task<IResult> GetAllData(IDataRepo repo)
        {
            var data = await repo.GetAllAsync();
            return TypedResults.Ok(data);
        }
    }
}
