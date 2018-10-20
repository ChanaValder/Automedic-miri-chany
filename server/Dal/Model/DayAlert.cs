using System;
namespace Dal.Model
{
  public  class DayAlert
    {
        public long id { get; set; }
        
        public string nameMedicine { get; set; }
        public Nullable<bool> isTaken { get; set; }
        public string hour { get; set; }
    }
}
