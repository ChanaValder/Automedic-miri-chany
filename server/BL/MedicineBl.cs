using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Dal.Model;

namespace BL
{
  public class MedicineBl
  {
    public static List<medicine> getAllMedicine()
        {
          
      return MedicineDal.getAllMedicine();

    }
    public static List<medicine> getAllMedicine(string keyword)
    {
           
            return MedicineDal.getAllMedicine(keyword);

    }

  }
}
