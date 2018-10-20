using Dal.Converters;
using Dal.Model;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal
{
    public class UserMedicineDal
    {

        public static List<Model.UserMedicine> getUserMedicine(string mail, string password)
        {

            Users z = Connect.DB.Users.FirstOrDefault(x => x.mail == mail && x.password == password);
            IEnumerable<UserMedicines> userMedicine = Connect.DB.UserMedicines.Where(a => a.userId == z.id);
            return userMedicine.Select(UserMedicineConvert.UserMedicineToModel).ToList();


        }

        public static List<Model.UserMedicine> getAllUserMedicineSearch(string mail, string password, string keySearch)
        {

            Users z = Connect.DB.Users.FirstOrDefault(x => x.mail == mail && x.password == password);
            IEnumerable<UserMedicines> userMedicine = Connect.DB.UserMedicines.Where(a => a.userId == z.id && a.medicine.medicineName.StartsWith(keySearch));
            return userMedicine.Select(UserMedicineConvert.UserMedicineToModel).ToList();


        }

        public static bool deleteMedicine(UserMedicine medicine)
        {
            try
            {
                UserMedicines userMedicine = Converters.UserMedicineConvert.UserMedicineToEntity(medicine);
                userMedicine = Connect.DB.UserMedicines.Single(m => m.id == medicine.id);
                // userMedicine = Connect.DB.UserMedicines.Attach(userMedicine);
                Connect.DB.UserMedicines.Remove(userMedicine);
                Connect.DB.SaveChanges();
                return true;
            }
            catch (Exception e)
            {

                return false;
            }

        }



        public static int addUserMedicine(UserMedicine newMedicine)
        {


            try
            {
                //לא שומר
                var med = UserMedicineConvert.UserMedicineToEntity(newMedicine);

                Connect.DB.UserMedicines.Add(med);
                Connect.DB.SaveChanges();
                return med.id;
            }
            catch (Exception e)
            {

                return -1;
            }
        }

        public static bool addDayAlert(DayAlerts dayAlert)
        {
            try
            {
                Connect.DB.DayAlerts.Add(dayAlert);
                Connect.DB.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
        public static bool addAlert(Alerts alert,bool isNow)
        {
            try
            {
                Connect.DB.Alerts.Add(alert);
                Connect.DB.SaveChanges();
                if (isNow)
                {
                    Connect.DB.DayAlerts.Add(new DayAlerts() { alertId = alert.id, date = DateTime.Now, isTaken = false });
                    Connect.DB.SaveChanges();
                }
                return true;
            }
            catch (Exception e)
            {
                return false;
            }

        }
        //public static bool addDayAlert(DayAlerts dayAlert)
        //{
        //    try
        //    {
        //        Connect.DB.DayAlerts.Add(dayAlert);
        //        Connect.DB.SaveChanges();
        //        return true;
        //    }
        //    catch (Exception e)
        //    {
        //        return false;
        //    }

        //}
        static List<Alerts> alerts = Connect.DB.Alerts.Where(p => p.UserMedicines.userId == 2).ToList();

        //פונקציה המחזירה מערך התראות לעריכה 
        public static List<Alerts> getAlertsToEdit(string userId, int medicineId)
        {
            try
            {
                var userMedicine = Connect.DB.UserMedicines.Single(m => m.medicineId == medicineId && m.userId.ToString().Equals(userId));
                return userMedicine.Alerts.ToList();
            }
            catch (Exception e)
            {

                return new List<Alerts>();
            }
        }
        public static bool editUserMedicine(UserMedicine newMedicine)
        {


            try
            {
                var userMedicine = Connect.DB.UserMedicines.Single(m => m.id == newMedicine.id);
                userMedicine.amount = newMedicine.amount;
                userMedicine.frequency = newMedicine.frequency;
                userMedicine.fromDate = newMedicine.fromDate;
                userMedicine.toDate = newMedicine.toDate;
                userMedicine.medicineId = newMedicine.medicineId;
                userMedicine.timesADay = newMedicine.timesADay;
                userMedicine.unitsInStock = newMedicine.unitsInStock;
                alerts = userMedicine.Alerts.ToList();
                Connect.DB.SaveChanges();

                return true;
            }
            catch (Exception e)
            {

                return false;
            }
        }
        //ונקציה עורכת תרופה למשתמש כולל התראות
        public static bool editMedicineWithAlerts(UserMedicineAlert newMedicine)
        {


            try
            {
                var userMedicine = Connect.DB.UserMedicines.Single(m => m.medicineId.ToString() == newMedicine.medicineId && m.userId.ToString().Equals(newMedicine.userId));
                userMedicine.amount = newMedicine.amount;
                userMedicine.frequency = newMedicine.frequency;
                DateTime d = ToDateTime(newMedicine.fromDate);
                userMedicine.fromDate = d;
                d = ToDateTime(newMedicine.toDate);
                userMedicine.toDate = d;
                userMedicine.medicineId = long.Parse(newMedicine.medicineId);
                userMedicine.timesADay = newMedicine.timesADay;
                userMedicine.unitsInStock = newMedicine.unitsInStock;
                for (var i = 0; i < userMedicine.Alerts.Count; i++)
                {
                    userMedicine.Alerts.ElementAt(i).hour = newMedicine.listOfHours[i];
                }

                Connect.DB.SaveChanges();

                return true;
            }
            catch (Exception e)
            {

                return false;
            }
        }

        //ונקציה המוסיפה תרופה למשתמש כולל התראות
        public static bool addUserMedicineIncludeAlerts(UserMedicineAlert userMedicineAlert)
        {
            bool x = false;
            try
            {
                var usermedicine = new UserMedicine();

                usermedicine.medicineId = long.Parse(userMedicineAlert.medicineId);
                usermedicine.userId = long.Parse(userMedicineAlert.userId);
                DateTime d = ToDateTime(userMedicineAlert.fromDate);
                usermedicine.fromDate = d;
                d = ToDateTime(userMedicineAlert.toDate);
                usermedicine.toDate = d;
                usermedicine.amount = userMedicineAlert.amount;
                usermedicine.timesADay = userMedicineAlert.timesADay;
                usermedicine.unitsInStock = userMedicineAlert.unitsInStock;
                usermedicine.frequency = userMedicineAlert.frequency;

                var userMedicineId = addUserMedicine(usermedicine);
                if (ToDateTime(userMedicineAlert.fromDate)==DateTime.Today)
                    x = true;
                for (int i = 0; i < userMedicineAlert.timesADay; i++)
                {
                    var alert = new Alerts()
                    {
                        hour = userMedicineAlert.listOfHours[i],
                        userMedicineId = userMedicineId,
                    };
                
                    bool a = addAlert(alert,x);
                }

                //push notification
                //פונקציה כל 5 דקות ותפקידה לעבור על האלרטים היומיים ויביא מחרוזת של הודעה למשתמש
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        //פונקציה הצריכה להיות מופעלת יומיום 
        //initDayAlertsList שולח לפונצית
        public static void forInitDayAlertsList(long userId)
        {
            List<UserMedicines> userMedicineList = Connect.DB.UserMedicines.Where(u => u.userId == userId).ToList();
            for (var i = 0; i < userMedicineList.Count; i++)
            {
                initDayAlertsList(userMedicineList[i]);
            }
        }
        //dayalerts  פונקציה שממלאה את טבלת 

        public static bool initDayAlertsList(UserMedicines userMedicine)
        {
            try
            {
                TimeSpan c = DateTime.Today.Subtract(userMedicine.fromDate.Value);
                if (c.TotalDays % userMedicine.frequency == 0)
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
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static DateTime ToDateTime(string datetime)
        {
            try
            {
                datetime = datetime.Trim();
                datetime = datetime.Replace("  ", " ");
                string[] body = datetime.Split(' ');
                string[] date = body[0].Split('-');
                int year = int.Parse(date[0]);
                int month = int.Parse(date[1]);
                int day = int.Parse(date[2]);
                int hour = 0, minute = 0, second = 0, millisecond = 0;
                if (body.Length == 2)
                {
                    string[] tpart = body[1].Split(',');
                    string[] time = tpart[0].Split(':');
                    hour = int.Parse(time[0]);
                    minute = int.Parse(time[1]);
                    if (time.Length == 3) second = int.Parse(time[2]);
                    if (tpart.Length == 2) millisecond = int.Parse(tpart[1]);
                }
                return new DateTime(year, month, day, hour, minute, second, millisecond);
            }
            catch
            {
                return new DateTime();
            }
        }
        //פונקציה המחזירה את ההתראות לתאריך מסוים
        public static List<DayAlert> getAlertsListByDate(long userId, string date)
        {
            DateTime d = new DateTime();
            d = ToDateTime(date);
            List<DayAlert> listDateAlerts = new List<DayAlert>();
            try
            {
                List<UserMedicines> listUserMedicine = new List<UserMedicines>();
                listUserMedicine = Connect.DB.UserMedicines.Where(p => p.userId == userId).ToList();
                foreach (var userMedicine in listUserMedicine)
                {

                    TimeSpan ca = d.Subtract(userMedicine.fromDate.Value);

                    if (ca.TotalDays % userMedicine.frequency == 0 && userMedicine.toDate == d)
                    {
                        List<Alerts> listAlerts = Connect.DB.Alerts.Where(p => p.userMedicineId == userMedicine.id).ToList();
                        for (var i = 0; i < listAlerts.Count; i++)
                        {
                            listDateAlerts.Add(new DayAlert() { hour = listAlerts[i].hour, nameMedicine = listAlerts[i].UserMedicines.medicine.medicineName });


                        }
                    }
                }
                return listDateAlerts;
            }


            catch (Exception e)
            {
                return new List<DayAlert>();
            }
        }
        //פונקציה המחזירה את כל התרופות היומיות
        public static List<DayAlert> getDayAlertsList(long userId)
        {
            List<DayAlerts> listDayAlerts;
            try
            {
                List<DayAlert> listDayAlert = new List<DayAlert>();
                List<UserMedicines> listUserMedicine = new List<UserMedicines>();
                listUserMedicine = Connect.DB.UserMedicines.Where(p => p.userId == userId).ToList();
                //                listUserMedicine.ForEach(p => initDayAlertsList(p));
                //initDayAlertsList(Connect.DB.UserMedicines.FirstOrDefault(p => p.userId == userId));
                listDayAlerts = new List<DayAlerts>();
                listDayAlerts = Connect.DB.DayAlerts.Where(p => p.Alerts.UserMedicines.userId == userId).Where(p => p.alertId == p.Alerts.id).ToList();
                // .Select(p=>DayAlertConvert.AlertToModel(p)).ToList();
                listDayAlert = listDayAlerts.Select(p => DayAlertConvert.AlertToModel(p)).ToList();
                return listDayAlert;
            }
            catch (Exception e)
            {
                return new List<DayAlert>();
            }
        }

        //פונקציה המוחקת התראה למשתמש לאותו היום שמסמן שכבר לקח את התרופה ולא רוצה עליה התראה
        public static bool updatedDayAlertIsTaken(int idDayAlert)
        {
            try
            {
                var dayAlert = Connect.DB.DayAlerts.First(p => p.id == idDayAlert);
                dayAlert.isTaken = true;

                Connect.DB.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }
        //פונקציה הנקראת כאשר ההתראה מופעלת במקרה שלחץ על אישור- מפחיתה כמות ממלאי התרופות
        public static bool confirmTakingReduceAmountInStock(int medicineId, int userId)
        {
            try
            {
                var userMedicine = Connect.DB.UserMedicines.First(p => p.medicineId == medicineId && p.userId == userId);

                //userMedicine.unitsInStock =userMedicine.unitsInStock- userMedicine.amount;
                Connect.DB.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }
        }

        public static bool updateStack(UserMedicine newMedicine)
        {


            try
            {
                var userMedicine = Connect.DB.UserMedicines.FirstOrDefault(m => m.medicineId == newMedicine.medicineId && m.userId.ToString().Equals(newMedicine.userId.ToString()));
                userMedicine.unitsInStock = newMedicine.unitsInStock;

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
