using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
namespace Dal
{
 public class MedicineDal
  {
    public static List<medicine> getAllMedicine()
    {
      return Connect.DB.medicine.ToList();

    }
    public static List<medicine> getAllMedicine(string keyword)
    {
      return Connect.DB.medicine.Where(m=>m.medicineName.StartsWith(keyword)).Take(10).ToList();

    }
  }
}
