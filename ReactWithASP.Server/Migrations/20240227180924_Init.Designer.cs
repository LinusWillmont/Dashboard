﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using TempHumiditySensor.Data;

#nullable disable

namespace ReactWithASP.Server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20240227180924_Init")]
    partial class Init
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("TempHumiditySensor.Model.TempHumidity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Humidity")
                        .HasColumnType("integer")
                        .HasColumnName("humidity");

                    b.Property<DateTime>("LoggedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("logged_at");

                    b.Property<int>("Temp")
                        .HasColumnType("integer")
                        .HasColumnName("temp");

                    b.HasKey("Id");

                    b.ToTable("temp_humidity_readings");
                });
#pragma warning restore 612, 618
        }
    }
}
