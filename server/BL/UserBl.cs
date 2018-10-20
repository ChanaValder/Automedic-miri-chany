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
    public static class UserBl
    {
        public static List<Users> getUsers()
        {
            return UserDal.GetUsers();
        }
    
       public static Users login( string mail, string password)
       {
         return Dal.UserDal.login(mail, password);

       }
    public static bool register(User newUser)
    {
      return Dal.UserDal.register(newUser);

    }
       
        
    }

}

