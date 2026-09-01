using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KollaDesk.BuildingBlocks.Infrastructure.Persistence;

public class ObjectRegistryEntryConfiguration : IEntityTypeConfiguration<ObjectRegistryEntry>
{
    public void Configure(EntityTypeBuilder<ObjectRegistryEntry> builder)
    {
        builder.ToTable("object_registry");

        builder.HasKey(e => e.ObjectKey);

        builder.Property(e => e.ObjectKey).HasColumnName("object_key");
        builder.Property(e => e.ObjectType).HasColumnName("object_type").HasMaxLength(100).IsRequired();
        builder.Property(e => e.ObjectId).HasColumnName("object_id").HasMaxLength(60).IsRequired();
        builder.Property(e => e.ProjectObjectKey).HasColumnName("project_object_key");
        builder.Property(e => e.RecordState).HasColumnName("record_state").HasMaxLength(20).IsRequired();
        builder.Property(e => e.DataClassification).HasColumnName("data_classification").HasMaxLength(20).IsRequired();
        builder.Property(e => e.CreatedAt).HasColumnName("created_at").IsRequired();
        builder.Property(e => e.UpdatedAt).HasColumnName("updated_at");

        // object_type + object_id must be unique (baseline §22.1).
        builder.HasIndex(e => new { e.ObjectType, e.ObjectId }).IsUnique();

          // NOTE: optimistic concurrency (baseline §22.4) is added later, when the
        // first updatable object exists. Postgres' xmin will be wired in then.
    }
}