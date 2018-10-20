import { Component, Input, OnChanges, SimpleChanges, OnInit } from "@angular/core";
import { User } from 'src/app/Models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { UserService } from 'src/app/Services/user.service';
import { Hmo } from 'src/app/models/Hmo';
import swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  myHero: User;
  hmoList:Hmo[];
  constructor(private userServices:UserService, private router: Router) {
    this.myHero = new User();
  
  }



  ngOnInit() {
     alert("on rgister init");
     document.getElementById('id01').style.display='block'
     this.userServices.getAllHmo().subscribe(hmoList => {
       this.hmoList= hmoList;
        },
           (error: HttpErrorResponse) => alert("can't connect to database"))
  }
  OnSubmit()
  {       
     
       this.userServices.add(this.myHero).subscribe(res=>{
         if(res==true){
         swal("Success","you are in our site!! welcome!!!","success");
         this.router.navigate(['/homePage']);

        }
         else alert("tou are healthy Baruch   Hashem!!! you dont need our site!!! bye bye!!!");
       });
     
               sessionStorage.setItem("userMail", this.myHero.mail.toString());
               sessionStorage.setItem("userPassword", this.myHero.password.toString());
               //this.rout.navigate(['/startPoint']);
               
              //else this.rout.navigate(['/Register'])
       
      //  },
       
      //     (error: HttpErrorResponse) => alert("can't connect to database"))
      //    // this.userMedicineList= this.medicineServ.getAllUserMedicine(sessionStorage.getItem("userMail"), sessionStorage.getItem("userPassword"));
   
       
      //  //}
  }


}












