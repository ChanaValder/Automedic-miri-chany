
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




@Injectable()
export class UserService {
    private heroes: User[];
    public nameHero: any;

    constructor(private http: Http) {
        this.heroes = [
            { id: 1, firstName: "חיים", lastName: "aaa", mail: "we@we", password: "12345678" },
            { id: 2, firstName: "שלמה", lastName: "bb", mail: "chany@gmail.com", password: "22222222" },
            { id: 3, firstName: "יהודה", lastName: "cc", mail: "mirio@gmail.com", password: "77777777" },
            { id: 4, firstName: "יוסף", lastName: "dd", mail: "miroi@gmail.com", password: "85885858" }
        ]


    }

    getAllUsers(): any {
      alert("getAllUser works!");
        //return this.http.get("http://localhost:52339/api/user/getUsers")
         
    }
getUser(mail:string,password:string):any{
  alert("getUser works!");
  return this.http.get("http://localhost:52339/api/user/login/" + mail + "/" + password)
  .pipe(map(response => response.json()));
}



    remove(student: User) {

        this.heroes.splice(this.heroes.indexOf(student), 1)
    }
    add(newUser: User) {
       return  this.http.post("http://localhost:52339/api/user/register", newUser).pipe(map(response => response.json()));
        // this.heroes.push(newUser);
    }
    saveUser(hero: User) {
        this.nameHero = hero;
    }
    getAllHmo():Observable<any>
    {
        return this.http.get("http://localhost:52339/api/Hmo/getAllHmo")
        .pipe(map(response => response.json()));
    }
    


}

