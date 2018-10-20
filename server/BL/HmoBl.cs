using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entities;
using Dal;
namespace BL
{
 public static class HmoBl
  {

    public static List<HMO> getAllHmo()
    {
      return Dal.HmoDal.getAllHmo();
    }
  }
}
