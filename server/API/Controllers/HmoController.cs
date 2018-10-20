using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Entities;

namespace API.Controllers
{
  [EnableCors("*", "*", "*")]
  public class HmoController : ApiController
    {

    [HttpGet]
    [Route("api/Hmo/getAllHmo")]
    public List<HMO> getAllHmo()
    {
      return BL.HmoBl.getAllHmo();
    }
  }
}
