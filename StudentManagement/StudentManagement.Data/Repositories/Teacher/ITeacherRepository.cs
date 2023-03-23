using System.Collections.Generic;
using System.Threading.Tasks;
using StudentManagement.Data.Models;

namespace StudentManagement.Data.Repositories
{
    public interface ITeacherRepository
    {
        /// <summary>
        /// Get list teachers
        /// </summary>
        /// <returns>list teachers</returns>
        IList<Teacher> GetListTeachers();

        /// <summary>
        /// Add a new teacher
        /// </summary>
        /// <param name="teacherInput"></param>
        /// <returns>teacher</returns>
        Task<Teacher> AddNewTeacher(Teacher teacherInput);
    }
}
