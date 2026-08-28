using System.Text.RegularExpressions;

namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// A typed reference to a status. A status identity is always the pair
/// axis + code (e.g. axis "invoice_status", code "draft") - never a bare string.
/// </summary>
public sealed partial record StatusReference
{
    public string Axis { get; }
    public string Code { get; }

    public StatusReference(string axis, string code)
    {
        Axis = Validate(axis, nameof(axis));
        Code = Validate(code, nameof(code));
    }

    public override string ToString() => $"{Axis}:{Code}";

    private static string Validate(string value, string paramName)
    {
        var trimmed = value?.Trim() ?? string.Empty;

        if (!TokenPattern().IsMatch(trimmed))
        {
            throw new ArgumentException(
                $"Invalid {paramName} '{value}'. Expected lowercase letters, digits and " +
                "underscores, e.g. 'invoice_status'.",
                paramName);
        }

        return trimmed;
    }

    [GeneratedRegex("^[a-z][a-z0-9_]*$")]
    private static partial Regex TokenPattern();
}