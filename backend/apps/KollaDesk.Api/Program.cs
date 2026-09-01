using KollaDesk.BuildingBlocks.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register the database context and point it at PostgreSQL.
builder.Services.AddDbContext<KollaDeskDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("KollaDesk")));
        
var app = builder.Build();

app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "KollaDesk.Api" }));

app.Run();