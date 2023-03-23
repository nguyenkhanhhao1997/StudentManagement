using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data.Models;
using StudentManagement.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        /// <summary>
        /// _studentAppService
        /// </summary>
        public readonly IStudentAppService _studentAppService;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="studentAppService"></param>
        public StudentsController(IStudentAppService studentAppService)
        {
            this._studentAppService = studentAppService;
        }

        /// <summary>
        /// Get list students
        /// </summary>
        /// <returns>list students</returns>
        [HttpGet]
        [Route("GetListStudents")]
        public async Task<IEnumerable<Student>> GetListStudents()
        {
            var result = await this._studentAppService.Get();
            return result;
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
            if (listStudentInput == null || listStudentInput.Teachers.Count < 2 || listStudentInput.Students.Count < 30)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            else
            {
                var result = await this._studentAppService.Insert(listStudentInput);
                if (result == true)
                {
                    return Ok("ok");
                }
                else
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
                }
            }
        }
    }
}
