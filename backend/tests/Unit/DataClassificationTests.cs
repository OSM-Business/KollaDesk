using KollaDesk.BuildingBlocks.Domain;

namespace KollaDesk.UnitTests;

public class DataClassificationTests
{
    [Fact]
    public void Default_is_internal()
    {
        Assert.Equal(DataClassification.Internal, DataClassifications.Default);
    }

    [Theory]
    [InlineData(DataClassification.Public, "public")]
    [InlineData(DataClassification.Internal, "internal")]
    [InlineData(DataClassification.Confidential, "confidential")]
    [InlineData(DataClassification.Restricted, "restricted")]
    public void ToCode_returns_canonical_code(DataClassification classification, string expected)
    {
        Assert.Equal(expected, classification.ToCode());
    }

    [Fact]
    public void FromCode_rejects_unknown_code()
    {
        Assert.Throws<FormatException>(() => DataClassifications.FromCode("secret"));
    }
}