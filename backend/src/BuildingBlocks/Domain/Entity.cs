namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// Base for every instantiable domain object. It enforces the common object
/// contract: a typed identity, a UTC creation timestamp, a technical record
/// state and a data classification.
///
/// created_by is intentionally NOT included yet: there is no user/actor concept
/// until Identity (KD-DEV-0006), and we do not store placeholder values.
/// </summary>
public abstract class Entity
{
    public ObjectId Id { get; }
    public DateTimeOffset CreatedAt { get; }
    public RecordState RecordState { get; }
    public DataClassification DataClassification { get; }

    protected Entity(
        ObjectId id,
        DateTimeOffset createdAt,
        DataClassification dataClassification = DataClassifications.Default)
    {
        ArgumentNullException.ThrowIfNull(id);

        Id = id;
        CreatedAt = createdAt.ToUniversalTime(); // stored as UTC, per the baseline
        RecordState = RecordStates.Default;      // Active
        DataClassification = dataClassification;
    }
}