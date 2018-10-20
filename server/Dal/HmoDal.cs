using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
  public static class HmoDal
  {
    public static List<HMO> getAllHmo()
    {
      return Connect.DB.HMO.ToList();

    }
  }
}
