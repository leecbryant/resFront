// Core angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable,  } from 'rxjs';
// Custom
import { environment } from '../../environments/environment';
import { Hall } from '../_interfaces/hall.interface';
import { Student } from '../_interfaces/student.interface';
import { Study } from '../_interfaces/study.interface';
import { Cards } from '../_interfaces/card.interface';
import { LoggableCurrency } from '../_interfaces/loggable.interface';
import { Resident } from '../_interfaces/resident.interface';
import { BalanceData, Balance } from '../_interfaces/balances.interface';
import { AllBalances } from '../_interfaces/balances-all.interface';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  })
};

@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(private http: HttpClient) { }
  getCards(): Observable<Cards> {
    return this.http.get<Cards>(environment.serverName + 'api/base/cards', httpOptions);
  }  

  getHalls(): Observable<Hall> {
    return this.http.get<Hall>(environment.serverName + 'api/base/halls', httpOptions);
  }  

  // Student Calls
  getStudents(): Observable<Student> {
    return this.http.get<Student>(environment.serverName + 'api/base/students', httpOptions);
  }

  newStudent(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/base/students', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  // Study Hours Calls
  getStudy(): Observable<Study> {
    return this.http.get<Study>(environment.serverName + 'api/base/study', httpOptions);
  }

  getStudyUnique(): Observable<Study> {
    return this.http.get<Study>(environment.serverName + 'api/base/studyunique', httpOptions);
  }


  newStudy(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/base/study', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  updateStudy(data): Observable<any> {
    return this.http.put<any>(environment.serverName + 'api/base/study', data, httpOptions);
  }

  getCurrencyLoggable(): Observable<LoggableCurrency> {
    return this.http.get<LoggableCurrency>(environment.serverName + 'api/currency/loggable', httpOptions);
  }

  newCurrencyLoggable(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/currency/balances', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  getResidents(): Observable<Resident> {
    return this.http.get<Resident>(environment.serverName + 'api/base/students', httpOptions);
  }

  getAllBalances(): Observable<AllBalances> {
    return this.http.get<AllBalances>(environment.serverName + 'api/currency/balances/all', httpOptions);
  }

  getAllBalancesUnique(): Observable<AllBalances> {
    return this.http.get<AllBalances>(environment.serverName + 'api/currency/balances/all/unique', httpOptions);
  }
}
