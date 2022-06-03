using Microsoft.EntityFrameworkCore;
using TaskManager.Models.comment;
using TaskManager.Models.employee;
using TaskManager.Models.tag;
using TaskManager.Models.workItem;

namespace TaskManager.Models.taskToDo
{
    public class TaskToDoContext : DbContext
    {
        public TaskToDoContext(DbContextOptions<TaskToDoContext> options): base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; } // This acts as a table - means "this is a DB of TaskToDo in SQL"
        public DbSet<WorkItem> WorkItems { get; set; }
        public DbSet<TaskToDo> TaskToDos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>(builder =>
            {
                builder
                    .HasKey(e => e.EmployeeId);
            });

            modelBuilder.Entity<WorkItem>(builder =>
            {
                builder
                    .HasKey(w => w.Id);

                builder
                    .HasOne(w => w.Employee)
                    .WithMany(e => e.WorkItems)
                    .HasForeignKey(w => w.EmployeeId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.ClientCascade);
            });
                     
            modelBuilder.Entity<TaskToDo>(builder =>
            {
                builder
                    .HasKey(t => t.Id);

                builder
                    .HasOne(t => t.Employee)
                    .WithMany(e => e.TasksToDo)
                    .HasForeignKey(t => t.EmployeeId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.ClientCascade);

                builder
                    .HasOne(t => t.WorkItem)
                    .WithMany(w => w.TaskToDos)
                    .HasForeignKey(t => t.WorkItemId)
                    .IsRequired()
                    .OnDelete(DeleteBehavior.ClientCascade);
            });

            modelBuilder.Entity<Comment>(builder =>
            {
                builder
                    .HasKey(c => c.CommentId);

                builder
                    .HasOne(c => c.WorkItem)
                    .WithMany(w => w.Comments)
                    .HasForeignKey(c => c.WorkItemId)
                    .OnDelete(DeleteBehavior.ClientCascade);

                builder
                    .HasOne(c => c.TaskToDo)
                    .WithMany(t => t.Comments)
                    .HasForeignKey(c => c.TaskToDoId)
                    .OnDelete(DeleteBehavior.ClientCascade);
            });

            modelBuilder.Entity<Tag>(builder =>
            {
                builder
                    .HasKey(t => t.TagId);

                builder
                    .HasOne(t => t.WorkItem)
                    .WithMany(w => w.Tags)
                    .HasForeignKey(t => t.WorkItemId)
                    .OnDelete(DeleteBehavior.ClientCascade);

                builder
                    .HasOne(t => t.TaskToDo)
                    .WithMany(ttd => ttd.Tags)
                    .HasForeignKey(t => t.TaskToDoId)
                    .OnDelete(DeleteBehavior.ClientCascade);
            });
        }
    }
}
