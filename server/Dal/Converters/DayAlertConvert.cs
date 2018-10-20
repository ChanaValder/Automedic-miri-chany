using Dal.Model;

namespace Dal.Converters
{
    internal class DayAlertConvert
    {
        public static DayAlert AlertToModel(Entities.DayAlerts DayAlertEntity)
        {
            return new DayAlert()
            {
                hour = DayAlertEntity.Alerts.hour,

                isTaken = DayAlertEntity.isTaken,
               

                nameMedicine=DayAlertEntity.Alerts.UserMedicines.medicine.medicineName,

                id=DayAlertEntity.id
               

            };

        }
    }
}