import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Services/medicine.service';
import { DayAlert } from 'src/app/models/DayAlert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/User';
import { UserMedicines } from 'src/app/Models/UserMedicines';
import swal from 'sweetalert2';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-home-page',
  templateUrl: './manage-stack.component.html',
  styleUrls: ['./manage-stack.component.css']
})
export class ManageStackCompoent implements OnInit {
 
  constructor(public medicineServ: MedicineService,private userServices: UserService, private rout: Router) { }
  userMedicineList: UserMedicines[];
  Isng:boolean=true;
  unitsInStock:number;
  medicineToUpdateStack:UserMedicines
  isEditStock:boolean=false
  ngOnInit( keySearch?:string) {
    
    
        // this.medicineServ.getAllMedicine().subscribe(medicines => {
    
        //  },
        //     (error: HttpErrorResponse) => alert("can't connect to database"))
    if(this.Isng)
    {
        this.medicineServ.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword")).subscribe(userMedicineList => {
          this.userMedicineList = userMedicineList;
        },
          (error: HttpErrorResponse) => alert("can't connect to database"))
      }
      else 
      {
        this.userMedicineList=[];
      this.medicineServ.getBooksSearch(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword"),keySearch).subscribe(res => {console.log(res);  this.userMedicineList = res }, err => { });
      }}
    
  search(keySearch) {
    if(keySearch)
    {
    this.Isng=false;
    this.ngOnInit(keySearch);
    }
    else{
      this.Isng=true;
         this.ngOnInit();
    }
  }
  editStack(medicine:UserMedicines)
  {
    this.isEditStock=true;
    document.getElementById("editstock").style.visibility='visible';
      this.unitsInStock=medicine.unitsInStock;
      this.medicineToUpdateStack=medicine;
  }
  updateStack()
  {
    document.getElementById("editstock").style.visibility='hidden';
    swal({
        title: `Are you sure you want to update the stack to ${this.unitsInStock} ?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update it!'
      }).then((result) => {
        if (result.value) {
            this.medicineToUpdateStack.unitsInStock=this.unitsInStock;
          this.medicineServ.updateStack( this.medicineToUpdateStack).subscribe(res => {
            if (res == true) {
              swal(
                `the amount of this medicine update to ${this.unitsInStock}`
              )                                                          
              
              
            }
            else alert("not update");
          })
        }
      })

  }

}
