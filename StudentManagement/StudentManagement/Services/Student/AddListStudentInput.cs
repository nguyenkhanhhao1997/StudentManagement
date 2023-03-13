using StudentManagement.Models;
using System.Collections.Generic;

namespace StudentManagement.Services
{
    public class AddListStudentInput
    {
        public List<Student> Students { get; set; }
        public List<Teacher> Teachers { get; set; }
    }
}
