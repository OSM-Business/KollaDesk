using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class RecordStateTests
{
    [Fact]
    public void Default_is_active()
    {
        Assert.Equal(RecordState.Active, RecordStates.Default);
    }

    [Theory]
    [InlineData(RecordState.Active, "active")]
    [InlineData(RecordState.Archived, "archived")]
    [InlineData(RecordState.Superseded, "superseded")]
    [InlineData(RecordState.Cancelled, "cancelled")]
    public void ToCode_returns_canonical_code(RecordState state, string expected)
    {
        Assert.Equal(expected, state.ToCode());
    }

    [Fact]
    public void FromCode_maps_code_back_to_value()
    {
        Assert.Equal(RecordState.Superseded, RecordStates.FromCode("superseded"));
    }

    [Fact]
    public void FromCode_rejects_a_workflow_status()
    {
        // "draft" is a workflow status, not a record_state -> must be rejected.
        Assert.Throws<FormatException>(() => RecordStates.FromCode("draft"));
    }
}