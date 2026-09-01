namespace KollaDesk.BuildingBlocks.Infrastructure.Persistence;

/// <summary>
/// One row in the central object_registry table (baseline §22.1).
/// This is a technical persistence record, not a domain object.
/// </summary>
public class ObjectRegistryEntry
{
    public Guid ObjectKey { get; set; }                 // technical primary key
    public string ObjectType { get; set; } = default!;
    public string ObjectId { get; set; } = default!;    // e.g. "PRJ-0192..."
    public Guid? ProjectObjectKey { get; set; }         // owning project, if any
    public string RecordState { get; set; } = default!;
    public string DataClassification { get; set; } = default!;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
}