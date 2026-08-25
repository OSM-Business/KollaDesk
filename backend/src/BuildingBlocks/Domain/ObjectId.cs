namespace KollaDesk.BuildingBlocks.Domain;

public sealed record ObjectId
{
    public string Prefix { get; }
    public string Value { get; }

    private ObjectId(string prefix, string value)
    {
        Prefix = prefix;
        Value = value;
    }

    public static ObjectId New(string prefix)
    {
        var normalizedPrefix = prefix.Trim().ToUpperInvariant();
        var hex = Guid.CreateVersion7().ToString("N"); // 32 hex chars, no dashes
        return new ObjectId(normalizedPrefix, $"{normalizedPrefix}-{hex}");
    }

    public override string ToString() => Value;
}