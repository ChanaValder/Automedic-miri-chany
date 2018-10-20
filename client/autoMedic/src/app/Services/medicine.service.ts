
import { Alerts } from "../../app/models/Alerts";
import { Injectable } from "@angular/core";
import { User } from "../../app/models/User";
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { debug } from 'util';
import { Response } from '@angular/http/src/static_response';
import { HttpErrorResponse } from "@angular/common/http";
import { Time } from '@angular/common/src/i18n/locale_data_api';
import { retry } from "rxjs/internal/operators/retry";
import { map, filter, catchError, mergeMap } from 'rxjs/operators';
import { promise } from "protractor";
import { HttpClient } from "@angular/common/http/src/client";
import { UserMedicines } from "src/app/Models/UserMedicines";
import { Medicine } from "src/app/Models/Medicine";
import { forEach } from "@angular/router/src/utils/collection";
import { Alert } from "selenium-webdriver";


@Injectable()
export class MedicineService {
    medicineToEditUserService:Alerts;
    userAlert:Alerts;
    medicineId:any;
    search:string;
//    alerts:Alerts[]=[
//        {medicineName:"cdd",userName:"dd",medicineId:5,userId:'5'}
//    ];
    constructor(private http: Http) {


    }

    getAllUserMedicine(mail:string,password:string): Observable<any> {
        // alert("getAllUserMedicine works!");
        
         return this.http.get("http://localhost:52339/api/UserMedicine/getAllUserMedicine/"+mail+"/"+password)
         .pipe(map(response => response.json()));       
    }

    getAllMedicine(): Observable<any>  

    {
      return this.http.get("http://localhost:52339/api/Medicine/getAllMedicine")
      .pipe(map(response => response.json()));;
    }

    deleteMedicine(medicine:UserMedicines)
    {
        return this.http.post("http://localhost:52339/api/UserMedicine/deleteMedicine",medicine).pipe(map(response => response.json()));
   
        // return  this.http.post("http://localhost:52339/api/user/register", newUser).pipe(map(response => response.json()));
   
     }
     editMedicine(medicine:UserMedicines)
     {
        return this.http.post("http://localhost:52339/api/UserMedicine/editMedicine",medicine).pipe(map(response => response.json()));
     }
    addUserMedicine(userMedicine: UserMedicines) {
       return  this.http.post("http://localhost:52339/api/UserMedicines/addUserMedicine", userMedicine).pipe(map(response => response.json()));
    
    }
    editUserMedicine(userMedicine: UserMedicines)
    {
        return  this.http.post("http://localhost:52339/api/UserMedicines/editUserMedicine", userMedicine).pipe(map(response => response.json()));
    }
    getAlertsForEdit()
    {
        return  this.http.get("http://localhost:52339/api/UserMedicine/getAlertsList").pipe(map(response => response.json()));
        
    }
    medicineToEditUser(userMedicineWithAlerts:Alerts)
    {
        this.medicineToEditUserService=userMedicineWithAlerts;
    }
     //עריכת תרופה כולל התראות
     editMedicineWithAlerts(userMedicineWithAlerts:Alerts){
        return  this.http.post("http://localhost:52339/api/UserMedicines/editMedicineWithAlerts",userMedicineWithAlerts).pipe(map(response => response.json()));        
    }
    //הוספת תרופה כולל התראות
    addUserMedicineIncludeAlerts(userMedicineWithAlerts:Alerts){
        return  this.http.post("http://localhost:52339/api/UserMedicine/addUserMedicineIncludeAlerts",userMedicineWithAlerts).pipe(map(response => response.json()));        
    }
   //פונקציה המקבלת את כל ההתראות היומיות
    getDayAlertsList(userId:string)
    {
        return this.http.get("http://localhost:52339/api/UserMedicine/getDayAlertsList/"+userId)
        .pipe(map(response => response.json()));     
    }
    //פונקציה המקבלת מערך התראות לעריכה
    getAlertsToEdit(medicineId:number)
    {
        return this.http.get("http://localhost:52339/api/UserMedicine/getAlertsToEdit/"+sessionStorage.getItem("userId")+"/"+medicineId)
        .pipe(map(response => response.json()));      
    }
    // updateAlerts(numOfAlerts:any[])
    // {
    // //  return this.http.get("http://localhost:52339/api/UserMedicine/getAllUserMedicine/"+mail+"/"+password)


//      return  this.http.post("http://localhost:52339/api/UserMedicines/updateAlerts", al).pipe(map(response => response.json()));        
//     }
getUserAlert(){
    return this.userAlert;
}
setUserAlert(userAlert:Alerts ){
    this.userAlert=userAlert;
    
    alert("hi");
}
updatedDayAlertIsTaken(idDayAlert:string)
{
    return this.http.get("http://localhost:52339/api/UserMedicines/updatedDayAlertIsTaken/"+idDayAlert).pipe(map(response => response.json()));    
  
}
confirmTakingReduceAmountInStock(medicineId:number,userId:number)
{
    return this.http.get("http://localhost:52339/api/UserMedicines/confirmTakingReduceAmountInStock/"+medicineId+"/"+userId).pipe(map(response => response.json()));   
  
}

getBooksSearch(mail:string,password:string,searchKey?:string):Observable<any>{

     
    this.search=searchKey;
    return this.http.get("http://localhost:52339/api/UserMedicine/getAllUserMedicineSearch/"+mail+"/"+password+"/"+searchKey)
    .pipe(map(response => response.json())); 
   }
   updateStack(medicine:UserMedicines)
   {
       
    
    return  this.http.post("http://localhost:52339/api/UserMedicine/updateStack",medicine).pipe(map(response => response.json()));    
    
   }
   

  

}


