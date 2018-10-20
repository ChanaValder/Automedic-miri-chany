using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BL;
using Dal.Model;
using initDayAlerts;

namespace API.Controllers
{
  [EnableCors("*", "*", "*")]
 
  public class UserMedicineController : ApiController
    {
    [HttpGet]
    [Route("api/UserMedicine/getAllUserMedicine/{mail}/{password}")]
    public List<Dal.Model.UserMedicine> getAllUserMedicine([FromUri] string mail, [FromUri] string password)
    {
      return UserMedicineBl.getUserMedicine(mail, password);
    }
        
             [HttpGet]
    [Route("api/UserMedicine/getAllUserMedicineSearch/{mail}/{password}/{searchKey}")]
    public List<Dal.Model.UserMedicine> getAllUserMedicineSearch([FromUri] string mail, [FromUri] string password,[FromUri] string searchKey)
        {
           return UserMedicineBl.getAllUserMedicineSearch(mail,password, searchKey);
        }
        [HttpGet]
        [Route("api/UserMedicine/getAlertsToEdit/{userId}/{medicineId}")]
        public List<Alerts> getAlertsToEdit([FromUri] string userId, [FromUri] int medicineId)
        {
            return UserMedicineBl.getAlertsToEdit(userId, medicineId);
        }


    [HttpPost]

    [Route("api/UserMedicine/deleteMedicine")]
    public HttpResponseMessage deleteMedicine([FromBody] UserMedicine medicine)
    {
      try
      {
        return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.deleteMedicine(medicine));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }

       [HttpPost]

 [Route("api/UserMedicines/addUserMedicine")]
    public HttpResponseMessage addUserMedicine([FromBody] UserMedicine newMedicine)
    {
      try
      {
        return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.addUserMedicine(newMedicine));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }


    }

    [HttpPost]
    [Route("api/UserMedicines/editMedicineWithAlerts")]
    public HttpResponseMessage editMedicineWithAlerts([FromBody] UserMedicineAlert newMedicine)
    {
      try
      {
        return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.editMedicineWithAlerts(newMedicine));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }
    [HttpGet]
    [Route("api/UserMedicines/updatedDayAlertIsTaken/{idDayAlert}")]
    public HttpResponseMessage updatedDayAlertIsTaken([FromUri] int idDayAlert)
    {
      try
      {
        return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.updatedDayAlertIsTaken(idDayAlert));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }
    [HttpGet]
    [Route("api/UserMedicines/confirmTakingReduceAmountInStock")]
    public HttpResponseMessage confirmTakingReduceAmountInStock([FromUri] int medicineId, [FromUri] int userId)
    {
      try
      {
        return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.confirmTakingReduceAmountInStock(medicineId, userId));
      }
      catch (Exception ex)
      {
        return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
      }
    }
    [HttpPost]
        [Route("api/UserMedicine/addUserMedicineIncludeAlerts")]
        public HttpResponseMessage addUserMedicineIncludeAlerts([FromBody] UserMedicineAlert numOfAlerts)
        {
            try
            {

                return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.addUserMedicineIncludeAlerts(numOfAlerts));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
        
             [HttpGet]
    [Route("api/UserMedicine/getDayAlertsList/{userId}")]
    public List<DayAlert> getDayAlertsList([FromUri] string userId)
        {
            return UserMedicineBl.getDayAlertsList(long.Parse(userId));
        }

        [HttpGet]
        [Route("api/UserMedicine/getAlertsListByDate/{userId}/{date}")]
        public List<DayAlert> getAlertsListByDate([FromUri] long userId, [FromUri] string date)
        {
            return UserMedicineBl.getAlertsListByDate(userId, date);
        }
        [HttpGet]
    [Route("api/UserMedicine/initDayAlertsList")]
    public bool initDayAlertsList()
    {
      return InitDayAlert.initDayAlertsList();
    }

        [HttpPost]
        [Route("api/UserMedicine/updateStack")]
        public HttpResponseMessage updateStack([FromBody] UserMedicine newMedicine)
        {
            try
            {

                return Request.CreateResponse(HttpStatusCode.OK, UserMedicineBl.updateStack(newMedicine));
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, ex);
            }
        }
      




    }

}


