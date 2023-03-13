using System.Collections.Generic;

namespace StudentManagement.Models
{
    public class Teacher
    {
        public int TeacherId { get; set; }
        public string TeacherName { get; set; }
        public virtual ICollection<Student> Students { get; set; }

    }
}
