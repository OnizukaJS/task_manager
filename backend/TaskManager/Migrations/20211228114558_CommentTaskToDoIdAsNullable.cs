using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TaskManager.Migrations
{
    public partial class CommentTaskToDoIdAsNullable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TaskToDos_TaskToDoId",
                table: "Comments");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskToDoId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TaskToDos_TaskToDoId",
                table: "Comments",
                column: "TaskToDoId",
                principalTable: "TaskToDos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_TaskToDos_TaskToDoId",
                table: "Comments");

            migrationBuilder.AlterColumn<Guid>(
                name: "TaskToDoId",
                table: "Comments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_TaskToDos_TaskToDoId",
                table: "Comments",
                column: "TaskToDoId",
                principalTable: "TaskToDos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
