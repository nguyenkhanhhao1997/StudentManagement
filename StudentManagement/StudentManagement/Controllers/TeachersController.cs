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
    public class TeachersController : ControllerBase
    {
        public readonly ITeacherRepository _teacherRepository;
        public TeachersController(ITeacherRepository teacherRepository)
        {
            this._teacherRepository = teacherRepository;
        }

        // GET: api/<ProductsController>
        [HttpGet]
        public IEnumerable<Teacher> Get()
        {
            return this._teacherRepository.GetListTeachers();
        }

        // POST api/<ProductsController>
        [HttpPost]
        public async Task<IActionResult> Post(TeacherInput teacherInput)
        {

            var teacher = await this._teacherRepository.AddNewTeacher(teacherInput);
            if (teacher.TeacherId > 0)
            {
                return Ok(1);
            }
            return Ok(0);
        }
    }
}
