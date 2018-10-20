import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import swal from 'sweetalert2';
@Component({
  selector: 'app-routs',
  templateUrl: './routs.component.html',
  styleUrls: ['./routs.component.css']
})
export class RoutsComponent implements OnInit {

  constructor( private rout: Router) {   }

  ngOnInit() {
   
  }
  
}
