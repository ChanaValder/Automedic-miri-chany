
using Dal.Model;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public static class UserDal
    {

        public static List<Users> GetUsers()
        {
            return Connect.DB.Users.ToList();
        }
    public static Users  login( string mail, string password)
    {
           
             var x=  Connect.DB.Users.FirstOrDefault(c => c.mail == mail && c.password == password);
      return x;
      //return UserBl.getUsers();
    }
    public static bool register(User newUser)
    {


      try
      {

        Connect.DB.Users.Add(Converters.UserConvert.UserToEntity(newUser));
        Connect.DB.SaveChanges();
        return true;
      }
      catch (Exception e)
      {

        return false;
      }
    }
  }
}

