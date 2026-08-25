var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

// Erster echter Endpunkt: meldet, dass der Dienst lebt.
app.MapGet("/health", () => Results.Ok(new { status = "ok", service = "KollaDesk.Api" }));

app.Run();