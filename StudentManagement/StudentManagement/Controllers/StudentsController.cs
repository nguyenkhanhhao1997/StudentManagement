using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using StudentManagement.Services;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        /// <summary>
        /// _studentRepository
        /// </summary>
        public readonly IStudentRepository _studentRepository;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="db"></param>
        /// <param name="studentRepository"></param>
        public StudentsController(EFDataContext db, IStudentRepository studentRepository)
        {
            this._studentRepository = studentRepository;
        }

        /// <summary>
        /// Get list students
        /// </summary>
        /// <returns>list students</returns>
        [HttpGet]
        [Route("GetListStudents")]
        public IEnumerable<Student> GetListStudents()
        {
            var students = this._studentRepository.GetListStudents();
            students.OrderBy(x => x.Teacher.TeacherName).ThenBy(s => s.DateOfBirth);
            return students;
        }

        /// <summary>
        /// Add a new student
        /// </summary>
        /// <param name="studentInput"></param>
        /// <returns>status</returns>
        [HttpPost]
        [Route("AddNewStudent")]
        public async Task<IActionResult> AddNewStudent(Student studentInput)
        {

            var student = await this._studentRepository.AddNewStudent(studentInput);
            if (student.StudentId > 0)
            {
                return Ok(1);
            }
            return Ok(0);
        }

        /// <summary>
        /// Add a list students
        /// </summary>
        /// <param name="listStudentInput"></param>
        /// <returns>status</returns>
        [HttpPost]
        [Route("AddListStudents")]
        public async Task<IActionResult> AddListStudents(AddListStudentInput listStudentInput)
        {
            if (listStudentInput == null || listStudentInput.Teachers.Count < 2 || listStudentInput.Students.Count < 3)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong"); ;
            }
            else
            {
                var result = await this._studentRepository.AddListStudents(listStudentInput);
                if (result == true)
                {
                    return Ok("Added Successfully");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong"); ;
                }
            }
        }
    }
}
