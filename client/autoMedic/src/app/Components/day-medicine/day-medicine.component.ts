import { Component, OnInit } from '@angular/core';
import { Data } from '@angular/router/src/config';
import { MedicineService } from 'src/app/Services/medicine.service';
import { DayAlert } from 'src/app/models/DayAlert';
import { HttpErrorResponse } from '@angular/common/http';

import swal from 'sweetalert2';
import { UserMedicines } from 'src/app/Models/UserMedicines';

@Component({
  selector: 'app-day-medicine',
  templateUrl: './day-medicine.component.html',
  styleUrls: ['./day-medicine.component.css']
})
export class DayMedicineComponent implements OnInit {
  todayDate:String;
  date:Date;
  dayAlertList: DayAlert[];
  isDateAlerts:boolean=false;
  dateForAlerts:Date;
  stringDate:string;
  fullDate:string;
  constructor(public medicineService: MedicineService) { 
    this.date=new Date();
    this.todayDate=this.date.toLocaleDateString();
   
   }
   dayAlertCheckBox(id:string,event)
   {
    swal({
      title: 'Are you sure you took the medicine?',
      text: "You won't be able to get alert any more",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, I took it!'
    }).then((result) => {
      if (result.value) {
        this.medicineService.updatedDayAlertIsTaken(id)
        .subscribe(res=> {
          if (res == true) {
            swal(
              'success this medicine was token';

            this.ngOnInit();
          }
        })
      }
      else  this.ngOnInit();
        })
	     alert(id);

  }
    
  ngOnInit() {
    
    this.date=new Date();
    this.todayDate=this.date.toLocaleDateString();
    this.medicineService.getDayAlertsList(sessionStorage.getItem("userId")).subscribe(dayAlertList => {
      this.dayAlertList = dayAlertList;
      
    },
      (error: HttpErrorResponse) => alert("can't connect to database"))
  }
  seeDateAlerts()
  {
    this.isDateAlerts=true;
  }
  parseDate(date:Date): Date {
    if (date) {
        return new Date(date);
    } else {
        return null;
    }

  }
//   pickDate()
//   {
//  alert (this.dateForAlerts);
//  var month =this.dateForAlerts.getMonth()+1;
//  this.fullDate=""+this.dateForAlerts.getFullYear()+"-"+month+"-"+this.dateForAlerts.getDate();
//    this.medicineService.getAlertsListByDate(sessionStorage.getItem("userId"), this.fullDate).subscribe(dayAlertList => {
//     this.dayAlertList = dayAlertList;   
//   })
//   }

}
