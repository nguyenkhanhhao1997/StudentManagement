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
        public readonly IStudentRepository _studentRepository;
        public StudentsController(EFDataContext db, IStudentRepository studentRepository)
        {
            this._studentRepository = studentRepository;
        }

        [HttpGet]
        public IEnumerable<Student> Get()
        {
            var students = this._studentRepository.GetListStudents();
            return students;
        }

        [HttpPost]
        public async Task<IActionResult> Post(StudentInput studentInput)
        {

            var student = await this._studentRepository.AddNewStudent(studentInput);
            if (student.StudentId > 0)
            {
                return Ok(1);
            }
            return Ok(0);
        }
    }
}
