using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class ObjectReferenceTests
{
    [Fact]
    public void Constructs_from_type_and_id()
    {
        var contractId = ObjectId.New("CON");
        var reference = new ObjectReference("contract", contractId);

        Assert.Equal("contract", reference.ObjectType);
        Assert.Equal(contractId, reference.ObjectId);
    }

    [Fact]
    public void ToString_joins_type_and_id()
    {
        var id = ObjectId.Parse("CON-0192f1a2b3c4d5e6f7a8b9c0d1e2f3a4");
        var reference = new ObjectReference("contract", id);

        Assert.Equal("contract:CON-0192f1a2b3c4d5e6f7a8b9c0d1e2f3a4", reference.ToString());
    }

    [Fact]
    public void Same_type_and_id_are_equal()
    {
        var id = ObjectId.Parse("CON-0192f1a2b3c4d5e6f7a8b9c0d1e2f3a4");

        Assert.Equal(
            new ObjectReference("contract", id),
            new ObjectReference("contract", id));
    }

    [Fact]
    public void Different_id_is_not_equal()
    {
        var reference1 = new ObjectReference("contract", ObjectId.New("CON"));
        var reference2 = new ObjectReference("contract", ObjectId.New("CON"));

        // Different underlying ObjectId -> not equal.
        Assert.NotEqual(reference1, reference2);
    }

    [Fact]
    public void Empty_object_type_is_rejected()
    {
        Assert.Throws<ArgumentException>(
            () => new ObjectReference("", ObjectId.New("CON")));
    }

    [Fact]
    public void Null_object_id_is_rejected()
    {
        Assert.Throws<ArgumentNullException>(
            () => new ObjectReference("contract", null!));
    }
}