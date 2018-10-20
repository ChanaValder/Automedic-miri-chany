import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicineService } from 'src/app/Services/medicine.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  sub: any;
  dayAlertId: string;
  constructor(private route: ActivatedRoute,private medicineService: MedicineService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(
      params => {
        this.dayAlertId = params['dayAlertId'];
      }
    );
   
  }
  confirm() {
this.medicineService.updatedDayAlertIsTaken(this.dayAlertId)
  }
}
