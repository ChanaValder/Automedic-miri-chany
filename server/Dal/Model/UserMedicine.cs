using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Model
{
  public class UserMedicine
  {
    public int id { get; set; }
    public long userId { get; set; }
    public Nullable<long> medicineId { get; set; }
    public string medicineName { get; set; }
    public System.DateTime fromDate { get; set; }
    public Nullable<System.DateTime> toDate { get; set; }
    public Nullable<double> amount { get; set; }
    public Nullable<int> timesADay { get; set; }
    public Nullable<int> frequency { get; set; }
     public Nullable<int> unitsInStock { get; set; }
    }
}
