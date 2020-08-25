// Core angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// Interfaces
import { Registration } from '../_interfaces/registration.interface';
import { User } from '../_interfaces/user.interface';
// Custom
import { environment } from '../../environments/environment';
import { Profile } from '../_interfaces/profile.interface';
import { JwtHelperService } from '@auth0/angular-jwt';


const helper = new JwtHelperService();

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

  login(data): Observable<User> {
    return this.http.post<User>(environment.serverName + 'api/users/login', data, httpOptions);
  }

  validate(data): Observable<any> {
    return this.http.get<User>(environment.serverName + 'api/users/validate/' + data, httpOptions);
  }

  register(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/users/register', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  resetPassword(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/users/password', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  getPasswordReset(data): Observable<any> {
    return this.http.get<any>(environment.serverName + 'api/users/password/' + data, httpOptions);
  }

  updateAccessibility(data):Observable<any> {
    return this.http.put<any>(environment.serverName + 'api/users/accessibility', data, httpOptions);
  }

  getRegistration(data: string): Observable<Registration> {
    return this.http.get<Registration>(environment.serverName + 'api/users/register/' + data, httpOptions);
  }

  getAccountInfo(data: string): Observable<Profile> {
    return this.http.get<Profile>(environment.serverName + 'api/users/userinfo/' + data, httpOptions);
  }

  updateAccountInfo(data): Observable<any> {
    return this.http.put<any>(environment.serverName + 'api/users/userinfo', data, httpOptions);
  }

  getTokenData(): Observable<any> {
      return helper.decodeToken(localStorage.getItem('token'));
  }
}
