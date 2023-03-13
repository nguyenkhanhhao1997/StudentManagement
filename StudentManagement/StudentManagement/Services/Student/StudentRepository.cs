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
        public readonly EFDataContext _db;
        public StudentRepository(EFDataContext db)
        {
            this._db = db;
        }
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

        public async Task<Student> AddNewStudent(StudentInput studentInput)
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
    }
}
