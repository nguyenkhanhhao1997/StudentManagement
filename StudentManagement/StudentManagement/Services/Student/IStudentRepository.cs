using StudentManagement.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public interface IStudentRepository
    {
        IList<Student> GetListStudents();
        Task<Student> AddNewStudent(StudentInput studentInput);

    }
}
