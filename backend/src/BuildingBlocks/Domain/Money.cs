using System.Globalization;
using System.Text.RegularExpressions;

namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// A monetary amount together with its currency.
/// Uses decimal (never float/double) and never rounds silently:
/// rounding is always an explicit, testable step.
/// </summary>
public sealed partial record Money
{
    public decimal Amount { get; }
    public string Currency { get; } // ISO 4217 alpha-3, e.g. "EUR"

    public Money(decimal amount, string currency)
    {
        Currency = NormalizeCurrency(currency);
        Amount = amount;
    }

    // Convenience for the common case (KollaDesk is EUR-based).
    public static Money Euro(decimal amount) => new(amount, "EUR");

    public Money Add(Money other)
    {
        EnsureSameCurrency(other);
        return new Money(Amount + other.Amount, Currency);
    }

    public Money Subtract(Money other)
    {
        EnsureSameCurrency(other);
        return new Money(Amount - other.Amount, Currency);
    }

    // e.g. unit price * quantity
    public Money Multiply(decimal factor) => new(Amount * factor, Currency);

    // Explicit rounding only: the caller must state the number of places and the
    // rule. No hidden default, so no accidental rounding can happen.
    public Money Round(int decimalPlaces, MidpointRounding rounding)
        => new(Math.Round(Amount, decimalPlaces, rounding), Currency);

    public override string ToString()
        => $"{Amount.ToString(CultureInfo.InvariantCulture)} {Currency}";

    private void EnsureSameCurrency(Money other)
    {
        if (Currency != other.Currency)
        {
            throw new InvalidOperationException(
                $"Cannot operate on different currencies: {Currency} and {other.Currency}.");
        }
    }

    private static string NormalizeCurrency(string currency)
    {
        var normalized = currency?.Trim().ToUpperInvariant() ?? string.Empty;

        if (!CurrencyPattern().IsMatch(normalized))
        {
            throw new ArgumentException(
                $"Invalid currency '{currency}'. Expected an ISO 4217 alpha-3 code, e.g. 'EUR'.",
                nameof(currency));
        }

        return normalized;
    }

    [GeneratedRegex("^[A-Z]{3}$")]
    private static partial Regex CurrencyPattern();
}