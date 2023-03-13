using System;

namespace StudentManagement.Models
{
    public class Student
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; }
        public DateTime DateOfBirth { get; set; }
        public int TeacherId { get; set; } 
        public Teacher Teacher { get; set; }
    }
}
