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
        var p = prefix.Trim().ToUpperInvariant();
        var hex = Guid.CreateVersion7().ToString("N");
        return new ObjectId(p, $"{p}-{hex}");
    }

    public override string ToString() => Value;
}