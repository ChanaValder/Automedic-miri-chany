using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Model
{
  public  class UserMedicineAlert
    {

        public string medicineId { get; set; }
        public string userId { get; set; }
        public string fromDate { get; set; }
        public string toDate { get; set; }
        public int timesADay { get; set; }
        public int amount { get; set; }
        public int unitsInStock { get; set; }
        public int frequency { get; set; }
        public List<string> listOfHours{ get; set; }






        
         

    }
}
