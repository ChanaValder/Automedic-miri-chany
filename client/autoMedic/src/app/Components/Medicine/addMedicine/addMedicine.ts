
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserAlert } from 'src/app/models/UserAlert';
import { Router, ActivatedRoute, RouterModule } from "@angular/router";
import { UserMedicines } from 'src/app/Models/UserMedicines';
import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from 'src/app/models/User';
import { Medicine } from 'src/app/models/Medicine';
import { UserService } from '../../../Services/user.service';
import { MedicineService } from '../../../Services/medicine.service';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2'
import { Data } from '@angular/router/src/config';
import { Alerts } from 'src/app/models/Alerts';
import { ConfirmAlertsComponent } from '../../confirm-alerts/confirm-alerts.component';
@Component({
  selector: 'app-addMedicine',
  templateUrl: './addMedicine.html',
  styleUrls: ['./addMedicine.css']
})



export class AddMedicineComponent implements OnInit {
  // sub: any;
  // userAlert: Alerts;
  alertsList: UserAlert[];
  // isAdd: boolean;

  userMedicineList: UserMedicines[];

  userMedicine: UserMedicines;
  medicineList: Medicine;
  userAlert: Alerts;
  fromDate: Date;
  toDate: Date;
  fromfullDate: string;
  tofullDate: string;
  date: number;
  isAdd: boolean;
  isButtenClick: boolean = false;
  sub: any;
  @Input()
  medicineToEdit: Medicine = null;
  @Output() delete = new EventEmitter();

  // private activeModal: NgbActiveModal,
  constructor(public medicineService: MedicineService, private rout: Router, private route: ActivatedRoute) {
    // this.fromDate=new Date();
    // this.toDate=new Date();
    // this.userAlert=new Alerts();

  }
  // cancel(): void {
  //   debugger;
  //   this.activeModal.dismiss();
  // }

  ngOnInit() {
    debugger;
    this.sub = this.route.params.subscribe(
      params => {
        this.isAdd = params['isAdd'];
      }
    );
    this.date = Date.now();
    this.userMedicine = new UserMedicines();
    this.userAlert = new Alerts();
    var x = this.medicineService.getUserAlert();

    if (x && this.isAdd != true) {

      this.userAlert = x;
      this.userAlert.listOfHours = new Array(Number(this.userAlert.timesADay));
      this.isAdd = false;
      this.medicineService.getAlertsToEdit(parseInt(this.userAlert.medicineId)).subscribe(alertList => {

        if (alertList != null)
          for (var i = 0; i < alertList.length; i++) {
            console.log(alertList[i].hour);
            this.userAlert.listOfHours[i] = alertList[i].hour;
          }


      })
    }

    this.medicineService.getAllMedicine().subscribe(res => {
      this.medicineList = res;
    });

    this.medicineService.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword")).subscribe(userMedicineList => {
      this.userMedicineList = userMedicineList;
    },
      (error: HttpErrorResponse) => alert("can't connect to database"))



  }



  // OnSubmit() {
  //   this.userMedicine.userId = parseInt(sessionStorage.getItem("userId"));
  //   if(this.isAdd){
  //   this.medicineService.addUserMedicine(this.userMedicine).subscribe(res => {
  //     if (res == true)
  //       swal("Success", "you are in our site!! welcome!!!", "success");

  //     else alert("tou are healthy Baruch   Hashem!!! you dont need our site!!! bye bye!!!");
  //     this.delete.emit();
  //   });}
  //   else
  //   {
  //     this.medicineService.editUserMedicine(this.userMedicine).subscribe(res => {
  //       if (res == true)
  //        { swal("Success", "you are in our site!! welcome!!!", "success");
  //        this.rout.navigate(['/startPoint']);
  //       }

  //       else alert("you are healthy Baruch   Hashem!!! you dont need our site!!! bye bye!!!");
  //       this.delete.emit();
  //     });
  //   }



  // }
  confirmAlerts() {

    this.userAlert.userId = sessionStorage.getItem("userId");
    var fromDateMonth = this.fromDate.getMonth() + 1;
    this.fromfullDate = "" + this.fromDate.getFullYear() + "-" + fromDateMonth + "-" + this.fromDate.getDate();
    this.userAlert.fromDate = this.fromfullDate;
    var toDateMonth = this.toDate.getMonth() + 1;
    this.tofullDate = "" + this.toDate.getFullYear() + "-" + toDateMonth + "-" + this.toDate.getDate();
    this.userAlert.toDate = this.tofullDate;
    this.medicineService.setUserAlert(this.userAlert);

    // this.rout.navigate(['/confirmAlerts', this.userAlert.timesADay]);
    this.alertsList = new Array();
    this.userAlert.listOfHours = new Array(Number(this.userAlert.timesADay));

  }

  parseDate(date: Date): Date {
    if (date) {
      return new Date(date);
    } else {
      return null;
    }

  }
  // -------------ConfirmAlertsComponent----------------
  addMedicineWithAlertsWithChecking() {
    for (var i = 0; i < this.userMedicineList.length; i++) {
      if (this.userMedicineList[i].medicineId.toString() == this.userAlert.medicineId) {

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
    if (i == this.userMedicineList.length) {
      this.addMedicineWithAlerts();
    }
  }

  addMedicineWithAlerts() {
    this.medicineService.setUserAlert(this.userAlert);
    this.medicineService.addUserMedicineIncludeAlerts(this.userAlert)
      .subscribe(res => {
        if (res == true)
         { swal("Success", "your medicine added to your basket");
           this.rout.navigate(['/startPoint']);
      }
      
       
  })

}
editMedicineWithAlerts() {

  this.medicineService.setUserAlert(this.userAlert);
  this.medicineService.editMedicineWithAlerts(this.userAlert)
    .subscribe(res => console.log(res), err => console.log(err));

}
trackByFn(index: any, item: any) {
  return index;
}
// -------------ConfirmAlertsComponent----------------s
  // ,this.userMedicine.timesADay
 
}


