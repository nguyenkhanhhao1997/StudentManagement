using StudentManagement.Data.Models;
using StudentManagement.Data.Repositories;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public class StudentAppService: IStudentAppService
    {
        /// <summary>
        /// student repository
        /// </summary>
        public readonly IStudentRepository _studentRepository;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="studentRepository"></param>
        public StudentAppService(IStudentRepository studentRepository) {
            this._studentRepository = studentRepository;
        }

        /// <summary>
        /// Get
        /// </summary>
        /// <returns></returns>
        public async Task<IEnumerable<Student>> Get()
        {
            var students = await this._studentRepository.GetListStudents();
            var result = students.OrderBy(x => x.Teacher.TeacherName).ThenBy(s => s.DateOfBirth).ToList();
            return result;
        }

        /// <summary>
        /// Insert
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        public async Task<bool> Insert(AddListStudentInput input)
        {
            var result = await this._studentRepository.AddListStudents(input);
            return result;
        }
    }
}
