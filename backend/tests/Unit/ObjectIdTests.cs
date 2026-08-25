using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class ObjectIdTests
{
    [Fact]
    public void New_generates_ID_in_correct_format()
    {
        var id = ObjectId.New("PRJ");

        Assert.Equal("PRJ", id.Prefix);
        Assert.Matches("^PRJ-[0-9a-f]{32}$", id.Value);
    }
}