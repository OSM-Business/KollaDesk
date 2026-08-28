using System.Text.RegularExpressions;

namespace KollaDesk.BuildingBlocks.Domain;

public sealed partial record ObjectId
{
    public string Prefix { get; }
    public string Value { get; }

    // Private: cannot be called directly from outside -> only via New()/Parse().
    private ObjectId(string prefix, string value)
    {
        Prefix = prefix;
        Value = value;
    }

    // Creates a brand-new, unique identifier for the given type prefix.
    public static ObjectId New(string prefix)
    {
        var normalizedPrefix = NormalizePrefix(prefix);
        var hex = Guid.CreateVersion7().ToString("N"); // 32 hex chars, no dashes
        return new ObjectId(normalizedPrefix, $"{normalizedPrefix}-{hex}");
    }

    // Parses an existing value; throws if the format is invalid.
    public static ObjectId Parse(string value)
    {
        if (!TryParse(value, out var id))
        {
            throw new FormatException(
                $"Invalid ObjectId '{value}'. Expected format: <PREFIX>-<32 hex chars>.");
        }

        return id!;
    }

    // Tries to parse an existing value without throwing.
    public static bool TryParse(string? value, out ObjectId? id)
    {
        id = null;

        if (value is null || !ValuePattern().IsMatch(value))
        {
            return false;
        }

        var prefix = value[..value.IndexOf('-')];
        id = new ObjectId(prefix, value);
        return true;
    }

    public override string ToString() => Value;

    private static string NormalizePrefix(string prefix)
    {
        var normalized = prefix?.Trim().ToUpperInvariant() ?? string.Empty;

        if (!PrefixPattern().IsMatch(normalized))
        {
            throw new ArgumentException(
                $"Invalid prefix '{prefix}'. Allowed: 2-10 letters A-Z.", nameof(prefix));
        }

        return normalized;
    }

    [GeneratedRegex("^[A-Z]{2,10}-[0-9a-f]{32}$")]
    private static partial Regex ValuePattern();

    [GeneratedRegex("^[A-Z]{2,10}$")]
    private static partial Regex PrefixPattern();
}