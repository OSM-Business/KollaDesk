using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class ObjectIdTests
{
    [Fact]
    public void New_creates_id_with_correct_format()
    {
        var id = ObjectId.New("PRJ");

        Assert.Equal("PRJ", id.Prefix);
        Assert.Matches("^PRJ-[0-9a-f]{32}$", id.Value);
    }

    [Fact]
    public void New_normalizes_prefix_to_uppercase()
    {
        var id = ObjectId.New("prj");
        Assert.Equal("PRJ", id.Prefix);
    }

    [Fact]
    public void Parse_accepts_a_valid_value()
    {
        var value = "PRJ-0192f1a2b3c4d5e6f7a8b9c0d1e2f3a4";

        var id = ObjectId.Parse(value);

        Assert.Equal("PRJ", id.Prefix);
        Assert.Equal(value, id.Value);
    }

    [Fact]
    public void New_then_Parse_round_trips()
    {
        var original = ObjectId.New("CON");
        var parsed = ObjectId.Parse(original.ToString());
        Assert.Equal(original, parsed);
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("PRJ")]                                    // no id part
    [InlineData("PRJ-xyz")]                                // not hex
    [InlineData("prj-0192f1a2b3c4d5e6f7a8b9c0d1e2f3a4")]   // lowercase prefix
    [InlineData("PRJ-0192F1A2B3C4D5E6F7A8B9C0D1E2F3A4")]   // uppercase hex
    public void TryParse_rejects_invalid_values(string? value)
    {
        Assert.False(ObjectId.TryParse(value, out var id));
        Assert.Null(id);
    }

    [Fact]
    public void Parse_throws_on_invalid_value()
    {
        Assert.Throws<FormatException>(() => ObjectId.Parse("nonsense"));
    }

    [Fact]
    public void New_throws_on_invalid_prefix()
    {
        Assert.Throws<ArgumentException>(() => ObjectId.New("!!"));
    }
}