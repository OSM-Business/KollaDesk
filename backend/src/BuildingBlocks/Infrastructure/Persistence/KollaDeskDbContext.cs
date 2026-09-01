using Microsoft.EntityFrameworkCore;

namespace KollaDesk.BuildingBlocks.Infrastructure.Persistence;

public class KollaDeskDbContext : DbContext
{
    public KollaDeskDbContext(DbContextOptions<KollaDeskDbContext> options)
        : base(options)
    {
    }

    // Each DbSet is one table EF Core knows about.
    public DbSet<ObjectRegistryEntry> ObjectRegistry => Set<ObjectRegistryEntry>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Pick up all IEntityTypeConfiguration classes in this project.
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(KollaDeskDbContext).Assembly);
    }
}