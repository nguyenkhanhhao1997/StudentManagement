using System.Collections.Generic;
using System.Threading.Tasks;
using StudentManagement.Models;

namespace StudentManagement.Services
{
    public interface ITeacherRepository
    {
        IList<Teacher> GetListTeachers();
        Task<Teacher> AddNewTeacher(TeacherInput teacherInput);

    }
}
