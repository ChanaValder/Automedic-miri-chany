using BL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web;
using System.IO;




namespace API.Controllers
{
  using Entities;
  public class MedicineController : ApiController
  {
    [EnableCors("*", "*", "*")]
    public class Medicine
    {
      //[HttpGet]
      //[Route("api/Medicine/getAllMedicine")]

      //public List<medicine> getAllMedicine()
      //{
      //  return MedicineBl.getAllMedicine();
         
      //}
      //public HttpResponseMessage getAllMedicine()
      //{
      //  var MedicineList = MedicineBl.getAllMedicine();
      //  //try
      //  //{
      //  //  var MedicineList = MedicineBl.getAllMedicine();
      //  //  return Request.CreateResponse(HttpStatusCode.OK, MedicineList);
      //  //}
      //  //catch (Exception ex)
      //  //{
      //  //  return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex.Message);
      //  //}
      //}
    }
  }
}
