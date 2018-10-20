using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Model
{
 public class User
  {
    public int id { get; set; }
    public string tz { get; set; }
    public string firstName { get; set; }
    public string lastName { get; set; }
    public string password { get; set; }
    public int hmoId { get; set; }
    public string mail { get; set; }
  }
}
