using KollaDesk.BuildingBlocks.Domain;
using KollaDesk.BuildingBlocks.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KollaDesk.IntegrationTests;

public class ObjectRegistryPersistenceTests
{
    // Dev connection string. Same values as appsettings.Development.json.
    // Note: this points at the local dev container on port 5433.
    private static DbContextOptions<KollaDeskDbContext> Options() =>
        new DbContextOptionsBuilder<KollaDeskDbContext>()
            .UseNpgsql("Host=localhost;Port=5433;Database=kolladesk;Username=kolladesk;Password=kolladesk_dev_pw")
            .Options;

    [Fact]
    public async Task Can_write_and_read_back_a_registry_entry()
    {
        var options = Options();
        var objectId = ObjectId.New("PRJ");
        var key = Guid.NewGuid();

        // 1. Write in one context.
        await using (var db = new KollaDeskDbContext(options))
        {
            db.ObjectRegistry.Add(new ObjectRegistryEntry
            {
                ObjectKey = key,
                ObjectType = "project",
                ObjectId = objectId.Value,
                RecordState = RecordState.Active.ToCode(),
                DataClassification = DataClassification.Internal.ToCode(),
                CreatedAt = DateTimeOffset.UtcNow
            });

            await db.SaveChangesAsync();
        }

        // 2. Read back in a FRESH context. This proves the row really went to the
        //    database and did not just live in the first context's memory.
        await using (var db = new KollaDeskDbContext(options))
        {
            var loaded = await db.ObjectRegistry.SingleAsync(e => e.ObjectKey == key);

            Assert.Equal("project", loaded.ObjectType);
            Assert.Equal(objectId.Value, loaded.ObjectId);
            Assert.Equal("active", loaded.RecordState);
            Assert.Equal("internal", loaded.DataClassification);

            // 3. Clean up so the test stays repeatable.
            db.ObjectRegistry.Remove(loaded);
            await db.SaveChangesAsync();
        }
    }
}