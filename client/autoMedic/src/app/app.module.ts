
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { AppComponent } from './app.component';
import { ManagmentComponent } from './components/managment/managment.component';
import { RegisterComponent } from './components/managment/register/register.component';
import { UserService } from './Services/user.service';
import { MedicineService } from './Services/medicine.service';
import { LoginComponent } from '../app/Components/managment/login/login.component';
import { Routes, RouterModule } from "@angular/router";
import { HttpModule } from '@angular/http';
import{StartPointComponent} from '../app/Components/startPoint/startPoint';
// import 'rxjs/add/operator/map'; //not sure if needed. for .map below
import {  JsonpModule } from '@angular/http';
// import "rxjs/Rx";
//import { HttpClientModule } from "@angular/common/http";
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';


import { CommonModule } from '@angular/common';
import { EditMedicineModalComponent } from './Components/edit-medicine-modal/edit-medicine-modal.component';
import { AddMedicineComponent } from '../app/Components/Medicine/addMedicine/addMedicine';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './Components/alerts/alerts.component';
import { AboutAppComponent } from './Components/aboutApp/aboutApp.component';
import { ConfirmAlertsComponent } from '../app/Components/confirm-alerts/confirm-alerts.component';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { DayMedicineComponent } from './Components/day-medicine/day-medicine.component';
import { AuthLogin } from './auth.login';
import { ManageStackCompoent } from 'src/app/Components/manage-stack/manage-stack.component';
import{RoutsComponent} from '../app/Components/routes/routs.component'
// import { ngInput } from 'ng-input';



 const route: Routes = [
  //  { path: '', component:ManagmentComponent },
  { path: 'aboutApp', component: AboutAppComponent },
   { path: 'login', component: LoginComponent },
   { path: 'register', component: RegisterComponent },
   { path: 'alert/:dayAlertId', component: AlertsComponent },
   { path:'startPoint', component: StartPointComponent},
   { path: 'dayMedicine', component: DayMedicineComponent },
   {path:'addMedicine/:isAdd',component:AddMedicineComponent},
   { path: 'editMedicine/:isAdd', component: AddMedicineComponent},
   { path: 'homePage', component: HomePageComponent},
   { path: 'dayMedicine', component: DayMedicineComponent },
   {path:'confirmAlerts/:number',component:ConfirmAlertsComponent},
   {path:'manageStack',component:ManageStackCompoent},
   
  //  { path:'startPoint', component: StartPointComponent, canActivate: [AuthLogin]},
  //  {path:'addMedicine/:isAdd',component:AddMedicineComponent, canActivate: [AuthLogin]},
  //  { path: 'editMedicine', component: AddMedicineComponent, canActivate: [AuthLogin] },
  //  { path: 'homePage', component: HomePageComponent, canActivate: [AuthLogin] },
  //  { path: 'dayMedicine', component: DayMedicineComponent, canActivate: [AuthLogin] },
  //  {path:'confirmAlerts/:number',component:ConfirmAlertsComponent, canActivate: [AuthLogin]},
 //{path:'manageStack',component:ManageStackCompoent, canActivate: [AuthLogin]},
  //  {path:'confirmAlerts/:number/:isAdd',component:ConfirmAlertsComponent},
   { path:'**', redirectTo:'login' },

 ]



@NgModule({
  declarations: [
    AppComponent,
    ManagmentComponent,
    LoginComponent,
    RegisterComponent,
    StartPointComponent,
    EditMedicineModalComponent,
    AddMedicineComponent,
    AlertsComponent,
    ConfirmAlertsComponent,
    HomePageComponent,
    DayMedicineComponent,
    AboutAppComponent,
    ManageStackCompoent,
    RoutsComponent
    // ngInput 
  ],

  imports: [
    BrowserModule,
    FormsModule,HttpModule,
    RouterModule.forRoot(route),
    HttpModule, 
    JsonpModule,
    FormsModule,
    CommonModule,
    FormsModule,
    NgbModule.forRoot()
    
    

  ],
  exports:[RouterModule],
  providers: [UserService,MedicineService],
  bootstrap: [AppComponent]
})

export class AppModule { }
