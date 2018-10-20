
import { Component, OnInit, Output , EventEmitter} from '@angular/core';

import { Router } from "@angular/router";

import { error } from 'util';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../Models/User';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
   mail: string;
   password: string;
   user: User;
   helpUser:User;
   isPass:boolean=false;
  flagPass: boolean;
  @Output()
  isRegister:EventEmitter<boolean>;
 
  
  constructor(private userServices: UserService, private rout: Router) {
     this.isRegister=new EventEmitter();
   
  }
register()
{

  this.isRegister.emit(true);
}
  ngOnInit() {

  }

  // OnSubmit() {
  //   alert("sesdsd");
  // this.userServices.getUser(this.mail, this.password).subscribe((users:User) => {
  //     if (users) {
  //        sessionStorage.setItem("userId", users.mail.toString());
  //        this.rout.navigate(['/startPoint']);
  //      }
  //      else this.rout.navigate(['/Register']);

  //    },
  //       (error: HttpErrorResponse) => alert("can't connect to database"))
  //   }
  // }

  OnSubmit() {

   this.userServices.getUser(this.mail,this.password)
   .subscribe(user => {
     debugger
    if (user) {
            sessionStorage.setItem("userId",user.id.toString());
            sessionStorage.setItem("userMail", user.mail.toString());
            sessionStorage.setItem("userPassword", user.password.toString());
            this.isRegister.emit(false);
            // this.rout.navigate(['/startPoint']);
            }
            this.isRegister.emit(true);
    
    },
    
       (error: HttpErrorResponse) => alert("can't connect to database"))
      // this.userMedicineList= this.medicineServ.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword"));

    
    }



    isPassF(){
     this.isPass=this.isPass?true:false;
    }






   
  }


  