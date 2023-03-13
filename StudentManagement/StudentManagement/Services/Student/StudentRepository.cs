using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Services
{
    public class StudentRepository: IStudentRepository
    {
        /// <summary>
        /// Dbcontext
        /// </summary>
        public readonly EFDataContext _db;

        /// <summary>
        /// TeacherRepository
        /// </summary>
        public readonly ITeacherRepository _teacherRepository;

        /// <summary>
        /// constructor
        /// </summary>
        /// <param name="db"></param>
        /// <param name="teacherRepository"></param>
        public StudentRepository(EFDataContext db, ITeacherRepository teacherRepository)
        {
            this._db = db;
            this._teacherRepository = teacherRepository;
        }

        /// <summary>
        /// Get list students
        /// </summary>
        /// <returns>list students</returns>
        public IList<Student> GetListStudents()
        {
            var students = _db.Students.Select(s => new Student
            {
                StudentId = s.StudentId,
                StudentName = s.StudentName,
                DateOfBirth = s.DateOfBirth,
                TeacherId = s.TeacherId,
                Teacher = _db.Teachers.Where(a => a.TeacherId == s.TeacherId).FirstOrDefault()
            }).ToList();
            return students;
        }


        /// <summary>
        /// Add a new student
        /// </summary>
        /// <param name="studentInput"></param>
        /// <returns>status</returns>
        public async Task<Student> AddNewStudent(Student studentInput)
        {
            var student = new Student()
            {
                StudentName = studentInput.StudentName,
                DateOfBirth = studentInput.DateOfBirth,
                TeacherId = studentInput.TeacherId,
                Teacher = this._db.Teachers.Find(studentInput.TeacherId)
            };
            this._db.Students.Add(student);
            await this._db.SaveChangesAsync();
            return student;
        }

        /// <summary>
        /// Add a list students
        /// </summary>
        /// <param name="listStudentInput"></param>
        /// <returns>status</returns>
        public async Task<bool> AddListStudents(AddListStudentInput listStudentInput)
        {
            try
            {
                using (var transaction = this._db.Database.BeginTransaction())
                {
                    var listTeacherIdNew = new List<Teacher>();
                    //Add teachers first, to get the new teacher id
                    foreach (var input in listStudentInput.Teachers)
                    {
                        listTeacherIdNew.Add(await this._teacherRepository.AddNewTeacher(input));
                    }

                    foreach (var input in listStudentInput.Students)
                    {
                        //input.TeacherId is the index of list teacher that call from api
                        //use the index to find in the list teacher to get the exactly id
                        var teacher = listTeacherIdNew[input.TeacherId];
                        input.TeacherId = teacher.TeacherId;
                        await this.AddNewStudent(input);
                    }
                    transaction.Commit();
                }

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
