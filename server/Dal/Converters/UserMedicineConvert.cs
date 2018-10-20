
using Dal.Model;
using Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dal.Converters
{
    public class UserMedicineConvert
    {

        public static UserMedicine UserMedicineToModel(UserMedicines UserMedicineEntity)
        {

            return new UserMedicine()
            {
                id = UserMedicineEntity.id,
                amount = UserMedicineEntity.amount,
                frequency = UserMedicineEntity.frequency,
                fromDate = UserMedicineEntity.fromDate.Value,
                medicineId = UserMedicineEntity.medicineId,
                timesADay = UserMedicineEntity.timesADay,
                toDate = UserMedicineEntity.toDate,
                userId = UserMedicineEntity.userId,
                unitsInStock = UserMedicineEntity.unitsInStock,
                medicineName = UserMedicineEntity.medicine.medicineName,


            };
            //return new UserMedicine()
            //{
            //    id = UserMedicineEntity.id,
            //    amount = UserMedicineEntity.amount,
            //    frequency = UserMedicineEntity.frequency,
            //    fromDate = UserMedicineEntity.fromDate,
            //    medicineId = UserMedicineEntity.medicineId,
            //    timesADay = UserMedicineEntity.timesADay,
            //    toDate = UserMedicineEntity.toDate,
            //    userId = UserMedicineEntity.userId,
            //    unitsInStock = UserMedicineEntity.unitsInStock,
            //    medicineName = UserMedicineEntity.medicine.medicineName
            //};

        }

        public static UserMedicines UserMedicineToEntity(UserMedicine userMedicineModel)
        {
            UserMedicines medicin = new UserMedicines()
            {

                id = userMedicineModel.id,
                amount = userMedicineModel.amount,
                frequency = userMedicineModel.frequency,
                fromDate = userMedicineModel.fromDate,
                medicineId = userMedicineModel.medicineId,
                timesADay = userMedicineModel.timesADay,
                toDate = userMedicineModel.toDate,
                userId = userMedicineModel.userId,
                unitsInStock = userMedicineModel.unitsInStock,
            };
            return medicin;
        }

    }
}
