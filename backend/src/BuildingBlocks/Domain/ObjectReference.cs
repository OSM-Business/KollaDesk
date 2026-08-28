namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// A typed reference from one object to another: object_type + object_id.
/// The referenced identity is carried as a validated ObjectId, so a reference
/// can never point at a malformed identifier.
/// </summary>
public sealed record ObjectReference
{
    public string ObjectType { get; }
    public ObjectId ObjectId { get; }

    public ObjectReference(string objectType, ObjectId objectId)
    {
        ArgumentNullException.ThrowIfNull(objectId);

        ObjectType = Validate(objectType);
        ObjectId = objectId;
    }

    public override string ToString() => $"{ObjectType}:{ObjectId}";

    private static string Validate(string objectType)
    {
        var trimmed = objectType?.Trim() ?? string.Empty;

        if (trimmed.Length == 0)
        {
            throw new ArgumentException(
                "object_type must not be empty.", nameof(objectType));
        }

        return trimmed;
    }
}