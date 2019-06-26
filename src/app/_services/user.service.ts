// Core angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// Interfaces
import { RegisterArray } from '../_interfaces/registration.interface'
// Custom
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
  })
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(private http: HttpClient) { }
  login(): Observable<any> {
    return this.http.get<any>(environment.serverName + 'api/users/login', httpOptions);
  }

  getRegistration(data: string): Observable<RegisterArray> {
    return this.http.get<RegisterArray>(environment.serverName + 'api/users/register/' + data, httpOptions);
  }

  getUser(data: string): Observable<any> {
    return this.http.get<any>(environment.serverName + 'api/users/getuser/username/:username', httpOptions);
  }
}
