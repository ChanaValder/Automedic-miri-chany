using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Model
{
   public class Alerts
    {
        public long medicineId { get; set; }
        public long userId { get; set; }
        public string medicineName { get; set; }
        public string userName { get; set; }

    }
}
