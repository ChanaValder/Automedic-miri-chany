import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Services/medicine.service';
import { DayAlert } from 'src/app/models/DayAlert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  dayAlertList: DayAlert[];
  userName:string;
  user:User;
  login:boolean=true;
  register:boolean=false;

  constructor(private userServices: UserService, private rout: Router) { }

  ngOnInit() {
   this.user=this.userServices.getUser( sessionStorage.getItem("userMail"),sessionStorage.getItem("userPassword"),)
   .subscribe(user => this.userName=user.firstName );
   
  }
getIsRegister(evt)
{
  alert("hi")
  if(evt==true)
  {
    this.login=false;
    this.register=true;
  }
  else{
    this.login=false;
    this.register=false;
  }
  
}
}
