namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// Technical lifecycle state of any record. This is NOT the business/workflow
/// status (draft, approved, paid) - those live elsewhere. Every object carries a
/// record_state; the default is Active.
/// </summary>
public enum RecordState
{
    Active,       // regular, active record
    Archived,     // no longer in the active working set
    Superseded,   // replaced by a newer record
    Cancelled     // cancelled in business terms, but kept for history
}

/// <summary>Maps RecordState to and from its canonical string code.</summary>
public static class RecordStates
{
    public const RecordState Default = RecordState.Active;

    public static string ToCode(this RecordState state) => state switch
    {
        RecordState.Active => "active",
        RecordState.Archived => "archived",
        RecordState.Superseded => "superseded",
        RecordState.Cancelled => "cancelled",
        _ => throw new ArgumentOutOfRangeException(
            nameof(state), state, "Unknown record state.")
    };

    public static RecordState FromCode(string code)
    {
        var normalized = code?.Trim().ToLowerInvariant();

        return normalized switch
        {
            "active" => RecordState.Active,
            "archived" => RecordState.Archived,
            "superseded" => RecordState.Superseded,
            "cancelled" => RecordState.Cancelled,
            _ => throw new FormatException($"Unknown record_state code '{code}'.")
        };
    }
}