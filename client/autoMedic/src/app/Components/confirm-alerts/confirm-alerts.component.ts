import { Component, OnInit, Input, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from '../../Services/user.service';
import { MedicineService } from '../../Services/medicine.service';
import { Alerts } from 'src/app/models/Alerts';
import { DayAlert } from 'src/app/models/DayAlert';
import { HttpErrorResponse } from '@angular/common/http';
import swal from 'sweetalert2';
import { UserAlert } from 'src/app/models/UserAlert'; import { UserMedicines } from 'src/app/Models/UserMedicines';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-confirm-alerts',
  templateUrl: './confirm-alerts.component.html',
  styleUrls: ['./confirm-alerts.component.css']
})
export class ConfirmAlertsComponent implements OnInit {
  sub: any;
  userAlert: Alerts;
  alertsList: UserAlert[];
  isAdd: boolean;

  userMedicineList: UserMedicines[];
  constructor(private route: ActivatedRoute,private rout: Router,   private userService: UserService, private medicineService: MedicineService) { }

  ngOnInit() {
    //list of all the userMedicines to verify that the customer doesnt have tow medicines
    this.medicineService.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword")).subscribe(userMedicineList => {
      this.userMedicineList = userMedicineList;
    },
      (error: HttpErrorResponse) => alert("can't connect to database"))

    //----------------------------------------------

    this.userAlert = new Alerts();
    if (!this.isAdd)
      this.userAlert = this.medicineService.getUserAlert();
    this.alertsList = new Array();
    this.sub = this.route.params.subscribe(
      params => {
        this.userAlert.listOfHours = new Array(Number(params['number']));
      }
    );

    if (!this.isAdd)
      this.medicineService.getAlertsToEdit(parseInt(this.userAlert.medicineId)).subscribe(alertList => {
        if (alertList != null)
          for (var i = 0; i < alertList.length; i++) {
            console.log(alertList[i].hour);
            this.userAlert.listOfHours[i] = alertList[i].hour;
          }
        this.alertsList;

      })
 
  }
  //פונקציה המופעלת כאשר אדם לוחץ על הוספת תרופה, בודקת אם קיימת אם כן שואלת אם רוצה לערוך או לא להוסיף אם לא מוסיפה
  addMedicineWithAlertsWithChecking() {
    for (var i = 0; i < this.userMedicineList.length; i++) {
      if (this.userMedicineList[i].medicineId.toString() == this.userAlert.medicineId)
      {

        swal({
          title: 'Hi, you have already this medicine',
          text: "Do you want to change existing?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, edit it!'
        }).then((result) => {
          if (result.value) {
            this.editMedicineWithAlerts();
          }
        })
        break;
      }
      
    }
    if(i==this.userMedicineList.length)
      {
        this.addMedicineWithAlerts();
      }
  }

  addMedicineWithAlerts() {
    this.medicineService.setUserAlert(this.userAlert);
    this.medicineService.addUserMedicineIncludeAlerts(this.userAlert)
      .subscribe(res => console.log(res), err => console.log(err));

  }
  editMedicineWithAlerts() {

    this.medicineService.setUserAlert(this.userAlert);
    this.medicineService.editMedicineWithAlerts(this.userAlert)
      .subscribe(res => console.log(res), err => console.log(err));

  }
  trackByFn(index: any, item: any) {
    return index;
  }
}
