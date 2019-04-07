import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable({ providedIn: 'root' })
export class LoginService {
  indexNo:string="";
  isloggedin:boolean=false;

  constructor(private http: Http) {
    console.log("connected to authentication");
}

  login(index_signin,password_signin){
    var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post("http://localhost/res_api/login.php",{"index_signin":index_signin,"password_signin":password_signin}).map(res=>res.json());
  }
  
  updateDetails(indexNo,firstname,lastname,password){
    //return this.http.post("http://localhost/Hall-Management-System/api/update.php",{"indexno":indexNo,"firstname":firstname,"lastname":lastname,"password":password}).map(res=>res.json());
  }
  
  logout() {
    localStorage.removeItem('token');
  }

  private _errorHandler(error:Response){
    console.error("Error Occured:"+error);
    return Observable.throw(error||"Some error occured in Server");
  }
}
