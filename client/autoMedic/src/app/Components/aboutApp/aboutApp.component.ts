import { Component, OnInit } from '@angular/core';
import { MedicineService } from 'src/app/Services/medicine.service';
import { DayAlert } from 'src/app/models/DayAlert';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-aboutApp',
  templateUrl: './aboutApp.component.html',
  styleUrls: ['./aboutApp.component.css']
})
export class AboutAppComponent implements OnInit {
  constructor(private rout: Router) { }

  ngOnInit() {
   
  }


}
