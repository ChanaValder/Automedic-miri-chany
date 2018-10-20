import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-managment',
  templateUrl: './managment.component.html',
  styleUrls: ['./managment.component.css']
})
export class ManagmentComponent implements OnInit {

 
  constructor(private userServices: UserService, private rout: Router) {

   }
  userName: string;
  user: User;
  login:boolean=false 

  ngOnInit() {
   
    this.user=this.userServices.getUser( sessionStorage.getItem("userMail"),sessionStorage.getItem("userPassword"),)
    .subscribe (user => this.userName=user.firstName );  
   

  }
  checkLogin()
  {
    if(sessionStorage.getItem("userPassword"))
    {
      this.login=true;
      location.reload();

    }
  }
  logOut()
  {



    swal({
      title: `Are you sure you want to leave ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.value) {
        sessionStorage.clear();
        this.rout.navigate(['/login']);
      }
    })


   
  }
}
