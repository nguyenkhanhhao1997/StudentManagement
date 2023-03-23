using System.Collections.Generic;

namespace StudentManagement.Data.Models
{
    public class AddListStudentInput
    {
        public List<Student> Students { get; set; }
        public List<Teacher> Teachers { get; set; }
    }
}
