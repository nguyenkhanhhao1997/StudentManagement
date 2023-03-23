using Microsoft.AspNetCore.Mvc;
using StudentManagement.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public interface IStudentAppService
    {
        /// <summary>
        /// Get list students
        /// </summary>
        /// <returns>list students</returns>
        Task<IEnumerable<Student>> Get();

        /// <summary>
        /// Insert list students and teachers
        /// </summary>
        /// <param name="input"></param>
        /// <returns>status</returns>
        Task<bool> Insert(AddListStudentInput input);
    }
}
