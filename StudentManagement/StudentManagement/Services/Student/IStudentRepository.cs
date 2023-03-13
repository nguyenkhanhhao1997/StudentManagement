using StudentManagement.Models;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public interface IStudentRepository
    {
        /// <summary>
        /// Get list students
        /// </summary>
        /// <returns>list students</returns>
        IList<Student> GetListStudents();

        /// <summary>
        /// Add a new student
        /// </summary>
        /// <param name="studentInput"></param>
        /// <returns>status</returns>
        Task<Student> AddNewStudent(Student studentInput);

        /// <summary>
        /// Add a list students
        /// </summary>
        /// <param name="listStudentInput"></param>
        /// <returns>status</returns>
        Task<bool> AddListStudents(AddListStudentInput listStudentInput);

    }
}
