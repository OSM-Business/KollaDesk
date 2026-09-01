using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KollaDesk.BuildingBlocks.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "object_registry",
                columns: table => new
                {
                    object_key = table.Column<Guid>(type: "uuid", nullable: false),
                    object_type = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    object_id = table.Column<string>(type: "character varying(60)", maxLength: 60, nullable: false),
                    project_object_key = table.Column<Guid>(type: "uuid", nullable: true),
                    record_state = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    data_classification = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_object_registry", x => x.object_key);
                });

            migrationBuilder.CreateIndex(
                name: "IX_object_registry_object_type_object_id",
                table: "object_registry",
                columns: new[] { "object_type", "object_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "object_registry");
        }
    }
}
