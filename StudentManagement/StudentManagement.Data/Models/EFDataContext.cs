using Microsoft.EntityFrameworkCore;

namespace StudentManagement.Data.Models
{
    public class EFDataContext : DbContext
    {
        public EFDataContext(DbContextOptions<EFDataContext> options)
         : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Student>().HasKey(s => s.StudentId);
            modelBuilder.Entity<Teacher>().HasKey(s => s.TeacherId);

            //set config replationship Student vs Teacher
            modelBuilder.Entity<Teacher>()
                .HasMany<Student>(s => s.Students)
                .WithOne(a => a.Teacher)
                .HasForeignKey(a => a.TeacherId)
                .OnDelete(DeleteBehavior.Restrict);

        }
        public DbSet<Teacher> Teachers { get; set; }
        public DbSet<Student> Students { get; set; }
    }
}
