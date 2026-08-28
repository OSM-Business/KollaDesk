using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class StatusReferenceTests
{
    [Fact]
    public void Constructs_from_axis_and_code()
    {
        var status = new StatusReference("invoice_status", "draft");

        Assert.Equal("invoice_status", status.Axis);
        Assert.Equal("draft", status.Code);
    }

    [Fact]
    public void ToString_joins_axis_and_code()
    {
        var status = new StatusReference("invoice_status", "approved");
        Assert.Equal("invoice_status:approved", status.ToString());
    }

    [Fact]
    public void Same_axis_and_code_are_equal()
    {
        Assert.Equal(
            new StatusReference("invoice_status", "paid"),
            new StatusReference("invoice_status", "paid"));
    }

    [Fact]
    public void Different_code_is_not_equal()
    {
        Assert.NotEqual(
            new StatusReference("invoice_status", "draft"),
            new StatusReference("invoice_status", "approved"));
    }

    [Theory]
    [InlineData("", "draft")]                  // empty axis
    [InlineData("invoice_status", "")]         // empty code
    [InlineData("Invoice_Status", "draft")]    // uppercase axis
    [InlineData("invoice status", "draft")]    // space in axis
    [InlineData("invoice_status", "DRAFT")]    // uppercase code
    public void Invalid_axis_or_code_is_rejected(string axis, string code)
    {
        Assert.Throws<ArgumentException>(() => new StatusReference(axis, code));
    }
}