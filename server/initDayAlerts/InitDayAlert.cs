using Dal.Converters;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace initDayAlerts
{
    public class InitDayAlert
    {
    public static bool addDayAlert(DayAlerts dayAlert)
    {
      try
      {
        Connect.DB.DayAlerts.Add(dayAlert);
        
        return true;
      }
      catch (Exception e)
      {
        return false;
      }

    }
    public static bool initDayAlertsList()
    {
      try
      {
        //מרוקן את טבלת האלרטים היומית
        var results = Connect.DB.DayAlerts.ToList();
        results.ForEach(r => Connect.DB.DayAlerts.Remove(r));
        //כאן צריך לרוקן את טבלת התרופות הלא רלוונטיות
        
        foreach (var userMedicine in Connect.DB.UserMedicines)
        {
        
            TimeSpan c = DateTime.Today.Subtract(userMedicine.fromDate.Value);
          if (c.TotalDays % userMedicine.frequency == 0&&userMedicine.toDate>=DateTime.Today)
          {
            List<Alerts> listAlerts = Connect.DB.Alerts.Where(p => p.userMedicineId == userMedicine.id).ToList();
            for (var i = 0; i < listAlerts.Count; i++)
            {
              DayAlerts dayAlert = new DayAlerts()
              {
                alertId = listAlerts[i].id,
                isTaken = false,
                date = DateTime.Today,
              };
              bool da = addDayAlert(dayAlert);

            }
          }
        }
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
