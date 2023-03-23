using StudentManagement.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Data.Repositories
{
    public class  TeacherRepository : ITeacherRepository
    {
        /// <summary>
        /// dbcontext
        /// </summary>
        public readonly EFDataContext _db;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="db"></param>
        public TeacherRepository(EFDataContext db)
        {
            this._db = db;
        }

        /// <summary>
        /// Get list teachers
        /// </summary>
        /// <returns>list teachers</returns>
        public IList<Teacher> GetListTeachers()
        {
            return this._db.Teachers.ToList();
        }

        /// <summary>
        /// Add a new teacher
        /// </summary>
        /// <param name="teacherInput"></param>
        /// <returns>teacher</returns>
        public async Task<Teacher> AddNewTeacher(Teacher teacherInput)
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
