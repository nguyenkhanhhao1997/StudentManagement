using StudentManagement.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public class  TeacherRepository : ITeacherRepository
    {
        public readonly EFDataContext _db;
        public TeacherRepository(EFDataContext db)
        {
            this._db = db;
        }

        public IList<Teacher> GetListTeachers()
        {
            return this._db.Teachers.ToList();
        }
        public async Task<Teacher> AddNewTeacher(TeacherInput teacherInput)
        {
            var teacher = new Teacher()
            {
                TeacherName = teacherInput.TeacherName,
            };
            this._db.Teachers.Add(teacher);
            await this._db.SaveChangesAsync();
            return teacher;
        }
    }
}
