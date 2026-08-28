using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class MoneyTests
{
    [Fact]
    public void Euro_creates_amount_in_EUR()
    {
        var price = Money.Euro(1250.00m);

        Assert.Equal(1250.00m, price.Amount);
        Assert.Equal("EUR", price.Currency);
    }

    [Fact]
    public void Add_sums_amounts_of_same_currency()
    {
        var result = Money.Euro(985.50m).Add(Money.Euro(120.00m));
        Assert.Equal(Money.Euro(1105.50m), result);
    }

    [Fact]
    public void Subtract_can_go_negative()
    {
        // e.g. a credit note larger than the invoice
        var result = Money.Euro(100.00m).Subtract(Money.Euro(150.00m));
        Assert.Equal(Money.Euro(-50.00m), result);
    }

    [Fact]
    public void Multiply_computes_a_line_total()
    {
        // 21.90 m² at 45.00 EUR/m²
        var lineTotal = Money.Euro(45.00m).Multiply(21.90m);
        Assert.Equal(Money.Euro(985.50m), lineTotal);
    }

    [Fact]
    public void Operations_on_different_currencies_throw()
    {
        var eur = Money.Euro(100.00m);
        var usd = new Money(100.00m, "USD");

        Assert.Throws<InvalidOperationException>(() => eur.Add(usd));
    }

    [Fact]
    public void Invalid_currency_is_rejected()
    {
        Assert.Throws<ArgumentException>(() => new Money(10.00m, "Euro"));
    }

    [Fact]
    public void Rounding_is_explicit_and_deterministic()
    {
        var raw = Money.Euro(10.005m);

        // Same input, different documented rule -> different, predictable result.
        Assert.Equal(Money.Euro(10.01m), raw.Round(2, MidpointRounding.AwayFromZero));
        Assert.Equal(Money.Euro(10.00m), raw.Round(2, MidpointRounding.ToEven));
    }

    [Fact]
    public void Same_amount_and_currency_are_equal_regardless_of_scale()
    {
        Assert.Equal(Money.Euro(10.0m), Money.Euro(10.00m));
    }
}