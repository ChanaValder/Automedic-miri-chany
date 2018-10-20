using Dal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Converters
{
    class AlertsConvert
    {

        public static Alert AlertToModel(Entities.Alerts AlertEntity)
        {
            return new Alert()
            {
                medicineId = AlertEntity.UserMedicines.medicineId,
                medicineName = AlertEntity.UserMedicines.medicine.medicineName,
                userId = AlertEntity.UserMedicines.Users.id,
                firstName = AlertEntity.UserMedicines.Users.firstName,
                lastName = AlertEntity.UserMedicines.Users.lastName,

            };

        }

        //public static Entities.Alerts AlertToEntity(Alert alertModel)
        //{
        //    Entities.Alerts alert = new Entities.Alerts()
        //    {
        //        medicineId = alertModel.medicineId,
        //        medicineName = alertModel.medicineName,
        //        firstName = alertModel.firstName,
        //        lastName = alertModel.lastName,

        //    };
        //    return alert;
        //}



    }
}


