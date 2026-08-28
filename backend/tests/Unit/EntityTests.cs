using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class EntityTests
{
    // A minimal concrete entity, only used to test the base contract.
    private sealed class TestEntity : Entity
    {
        public TestEntity(
            ObjectId id,
            DateTimeOffset createdAt,
            DataClassification classification = DataClassifications.Default)
            : base(id, createdAt, classification)
        {
        }
    }

    // A tiny controllable clock: always returns the time we gave it.
    private sealed class FixedTimeProvider(DateTimeOffset now) : TimeProvider
    {
        public override DateTimeOffset GetUtcNow() => now;
    }

    [Fact]
    public void New_entity_uses_the_clock_timestamp()
    {
        var clock = new FixedTimeProvider(
            new DateTimeOffset(2026, 5, 1, 8, 0, 0, TimeSpan.Zero));

        var entity = new TestEntity(ObjectId.New("PRJ"), clock.GetUtcNow());

        Assert.Equal(clock.GetUtcNow(), entity.CreatedAt);
    }

    [Fact]
    public void New_entity_defaults_to_active_and_internal()
    {
        var entity = new TestEntity(ObjectId.New("PRJ"), TimeProvider.System.GetUtcNow());

        Assert.Equal(RecordState.Active, entity.RecordState);
        Assert.Equal(DataClassification.Internal, entity.DataClassification);
    }

    [Fact]
    public void Data_classification_can_be_set_explicitly()
    {
        var entity = new TestEntity(
            ObjectId.New("CON"),
            TimeProvider.System.GetUtcNow(),
            DataClassification.Confidential);

        Assert.Equal(DataClassification.Confidential, entity.DataClassification);
    }

    [Fact]
    public void Null_id_is_rejected()
    {
        Assert.Throws<ArgumentNullException>(
            () => new TestEntity(null!, TimeProvider.System.GetUtcNow()));
    }
}