import { Component, OnInit } from '@angular/core';
import { MedicineService } from '../../Services/medicine.service';
import { UserMedicines } from 'src/app/Models/UserMedicines';
import { Medicine } from 'src/app/Models/Medicine';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditMedicineModalComponent } from 'src/app/Components/edit-medicine-modal/edit-medicine-modal.component';
import { AddMedicineComponent } from 'src/app/Components/Medicine/addMedicine/addMedicine';
import { Alerts } from 'src/app/models/Alerts';
import { UserService } from '../../Services/user.service';
@Component({
  selector: 'app-startPoint',
  templateUrl: './startPoint.html',
  styleUrls: ['./start-point.css']
})
export class StartPointComponent implements OnInit {
  userMedicineList: UserMedicines[];
  userMedicine:UserMedicines;
  medicines: Medicine[];
  mail: string;
  isadd: boolean = false;
  password: string;
  isEdit: boolean = false;
  isAllDetails: boolean = false;
  isNg: boolean = true;
  toggle: boolean = false;
  // @ViewChild("openModalButton") openModalButton:ElementRef;
  constructor(public medicineServ: MedicineService,public userService:UserService, private rout: Router, private modalService: NgbModal) { }

  ngOnInit(keySearch?:string) {


    // this.medicineServ.getAllMedicine().subscribe(medicines => {

    //  },
    //     (error: HttpErrorResponse) => alert("can't connect to database"))
if(this.isNg)
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

  deleteMedicine(medicine: UserMedicines) {
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.medicineServ.deleteMedicine(medicine).subscribe(res => {
          if (res == true) {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ngOnInit();
          }
        })
      }
    })
  }
  addUserMedicine() {
    
    debugger;
    // const modalRef = this.modalService.open(AddMedicineComponent, {
    //   centered: true,
    //   backdrop: 'static',
    //   size: 'sm'
    // });

    // // modalRef.componentInstance.delete.subscribe(() => {
    // //   debugger;
    // //   modalRef.close()
    // // });
   this.rout.navigate(['/addMedicine',1]);

  }
  showMoreDetails(userMedicine,event){
    this.userMedicine=userMedicine;
    this.isAllDetails=true;
    if (this.toggle == false) {
      document.getElementById(event.target.id).innerHTML += `    <ul>
    <li><h4>amount</h4>${this.userMedicine.amount}</li>
    <li><h4>frequency</h4>${this.userMedicine.frequency}</li>
    <li><h4>fromDate</h4>${this.userMedicine.fromDate}</li>
    <li><h4>toDate</h4>${this.userMedicine.toDate}</li>
    <li><h4>timesADay</h4>${this.userMedicine.timesADay}</li>
    <li><h4>unitsInStock</h4>${this.userMedicine.unitsInStock}</li>
</ul>`
      this.toggle = true
    }
    else {
      document.getElementById(event.target.id).innerHTML = `<p class="title">${userMedicine.medicineName}</p>`
      this.toggle = false;


    }

  }  
  editMedicine(medicine: Alerts) {
     //const modalRef = this.modalService.open(AddMedicineComponent, {
      // centered: true,
      // backdrop: 'static',
      // size: 'sm'
    // });
    //  this.rout.navigate(['/editMedicine',medicine]); 
  //  this.isEdit = true;
    //    this.openModalButton.nativeElement.click();
    // this.medicineServ.editMedicine(medicine).subscribe(res=>{
    //   if(res==true)
    //   alert("the medicine editted");
    //   else alert("not edit");
    // });
  this.medicineServ.setUserAlert(medicine);
  this.rout.navigate(['/editMedicine',0]);
  }
  search(keySearch) {
    if(keySearch)
    {
    this.isNg=false;
    this.ngOnInit(keySearch);
    }
    else{
      this.isNg=true;
         this.ngOnInit();
    }
  }
  showAlerts()
  {
    
  }

}







