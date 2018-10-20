using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Model
{
    class Alert
    {
        public long userId { get; set; }
        public Nullable<long> medicineId { get; set; }
        public string medicineName { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }

    }
}
