namespace KollaDesk.BuildingBlocks.Domain;

/// <summary>
/// Sensitivity of the data in a record. Every object carries a
/// data_classification; the default is Internal. Restricted requires an explicit
/// access grant and is not covered by general project read access.
/// </summary>
public enum DataClassification
{
    Public,        // explicitly cleared for public use
    Internal,      // regular internal project data
    Confidential,  // confidential contract, personal or pricing data
    Restricted     // especially sensitive; needs an explicit access grant
}

/// <summary>Maps DataClassification to and from its canonical string code.</summary>
public static class DataClassifications
{
    public const DataClassification Default = DataClassification.Internal;

    public static string ToCode(this DataClassification classification) => classification switch
    {
        DataClassification.Public => "public",
        DataClassification.Internal => "internal",
        DataClassification.Confidential => "confidential",
        DataClassification.Restricted => "restricted",
        _ => throw new ArgumentOutOfRangeException(
            nameof(classification), classification, "Unknown data classification.")
    };

    public static DataClassification FromCode(string code)
    {
        var normalized = code?.Trim().ToLowerInvariant();

        return normalized switch
        {
            "public" => DataClassification.Public,
            "internal" => DataClassification.Internal,
            "confidential" => DataClassification.Confidential,
            "restricted" => DataClassification.Restricted,
            _ => throw new FormatException($"Unknown data_classification code '{code}'.")
        };
    }
}