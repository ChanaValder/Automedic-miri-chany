using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BL;
using Entities;
using System.Web.Http.Cors;
using API.Models;
using Dal.Model;

namespace API.Controllers
{
  public class UserController : ApiController
  {

    //[HttpGet]
    //public List<Users> getUsers()
    //{
    //    List<Users> Users = new List<Entities.Users>();
    //    Users = db.Users.ToList();
    //    return Users;
    //    //return UserBl.getUsers();
    //}

    [HttpGet]
    [Route("api/user/login/{mail}/{password}")]
    public Users login([FromUri] string mail, [FromUri] string password)
    {
        
      return BL.UserBl.login(mail, password);

    }


    [HttpPost]
    [Route("api/user/register")]
    public HttpResponseMessage register([FromBody] User newUser)
    {
      try
      {
       return Request.CreateResponse(HttpStatusCode.OK, UserBl.register(newUser));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }



    }

    [HttpGet]
    [Route("api/Medicine/getAllMedicine")]

    public List<medicine> getAllMedicine()
    {
      return MedicineBl.getAllMedicine();

    }

    [HttpGet]
    [Route("api/Medicine/getAllMedicine/{keyword}")]

    public List<medicine> getAllMedicine([FromUri]string keyword)
    {
            
      return MedicineBl.getAllMedicine(keyword);

    }

       

    }
}

