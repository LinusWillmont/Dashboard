using api_cinema_challenge.Data;
using Microsoft.EntityFrameworkCore;
using TempHumiditySensor.Data;
using TempHumiditySensor.Endpoints;
using TempHumiditySensor.Repo;

namespace TempHumiditySensor
{
    public class Program
    {
        public static void Main(string[] args)
        {
            const string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();

                    });
            });

            // Add services to the container.
            //builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseNpgsql(builder.Configuration.GetConnectionString("ElephantConnectionString"));
            });

            builder.Services.AddScoped<IDataRepo, DataRepo>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors(MyAllowSpecificOrigins);

            app.UseHttpsRedirection();

            app.ApplyProjectMigrations();

            //app.UseAuthorization();;

            app.ConfigureDataEndpoints();

            app.Run();
        }
    }
}
