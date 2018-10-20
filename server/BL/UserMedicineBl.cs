using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dal;
using Dal.Model;

namespace BL
{
    public class UserMedicineBl
    {
        public static List<Dal.Model.UserMedicine> getUserMedicine(string mail, string password)
        {
            return UserMedicineDal.getUserMedicine(mail, password);

        }

        public static List<Dal.Model.UserMedicine> getAllUserMedicineSearch(string mail, string password, string keySearch)
        {
            return UserMedicineDal.getAllUserMedicineSearch(mail, password, keySearch);

        }
        public static bool deleteMedicine(UserMedicine medicine)
        {
            return Dal.UserMedicineDal.deleteMedicine(medicine);

        }
        public static int addUserMedicine(UserMedicine newMedicine)
        {
            return Dal.UserMedicineDal.addUserMedicine(newMedicine);

        }

        public static bool editMedicineWithAlerts(UserMedicineAlert newMedicine)
        {
            return Dal.UserMedicineDal.editMedicineWithAlerts(newMedicine);
        }


        public static List<Alerts> getAlertsToEdit(string userId, int medicineId)
        {
            return Dal.UserMedicineDal.getAlertsToEdit(userId, medicineId);
        }
        public static bool addUserMedicineIncludeAlerts(UserMedicineAlert userMedicineAlert)
        {
            return Dal.UserMedicineDal.addUserMedicineIncludeAlerts(userMedicineAlert);

        }
        public static List<DayAlert> getDayAlertsList(long userId)
        {
            return Dal.UserMedicineDal.getDayAlertsList(userId);

        }
        public static List<DayAlert> getAlertsListByDate(long userId, string date)
        {
            return Dal.UserMedicineDal.getAlertsListByDate(userId, date);

        }


        public static bool confirmTakingReduceAmountInStock(int medicineId, int UserId)
        {
            return Dal.UserMedicineDal.confirmTakingReduceAmountInStock(medicineId, UserId);

        }
        public static bool updatedDayAlertIsTaken(int alertId)
        {
            return Dal.UserMedicineDal.updatedDayAlertIsTaken(alertId);

        }


        public static bool updateStack(UserMedicine newMedicine)
        {
            return Dal.UserMedicineDal.updateStack(newMedicine);
        }



    }
}


