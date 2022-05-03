using System.Collections.Generic;
using TaskManager.Models.employee;

namespace TaskManager.Dtos.blob
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; } = null!;
        public byte[] Picture { get; set; } = null!;
        public List<Employee> Employees { get; set; } = null!;
    }
}
