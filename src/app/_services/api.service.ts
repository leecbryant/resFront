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
import { EarnableCurrency } from '../_interfaces/currency-earnable.interface';
import { Resident } from '../_interfaces/resident.interface';
import { BalanceData, Balance } from '../_interfaces/balances.interface';
import { AllBalances } from '../_interfaces/balances-all.interface';

const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'application/json; odata=verbose',
    'Content-Type': 'application/json; odata=verbose'
  })
};

@Injectable({
  providedIn: 'root'
})

export class APIService {
  constructor(private http: HttpClient) { }
  getCards(): Observable<Cards> {
    return this.http.get<Cards>(environment.serverName + 'api/base/cards', );
  }  

  getHalls(): Observable<Hall> {
    return this.http.get<Hall>(environment.serverName + 'api/base/halls', );
  }  

  // Student Calls
  getStudents(): Observable<Student> {
    return this.http.get<Student>(environment.serverName + 'api/base/students', );
  }

  newStudent(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/base/students', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  // Study Hours Calls
  getStudy(): Observable<Study> {
    return this.http.get<Study>(environment.serverName + 'api/base/study', );
  }

  getStudyUnique(): Observable<Study> {
    return this.http.get<Study>(environment.serverName + 'api/base/studyunique', );
  }


  newStudy(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/base/study', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  updateStudy(data): Observable<any> {
    return this.http.put<any>(environment.serverName + 'api/base/study', data);
  }

  getCurrencyEarnables(): Observable<EarnableCurrency> {
    return this.http.get<EarnableCurrency>(environment.serverName + 'api/currency/earn', );
  }

  newCurrencyEarnable(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/currency/balances', data, {
      reportProgress: true,
      observe: 'response'
    });
  }

  getResidents(): Observable<Resident> {
    return this.http.get<Resident>(environment.serverName + 'api/base/students', );
  }

  getAllBalanceS(): Observable<AllBalances> {
    return this.http.get<AllBalances>(environment.serverName + 'api/currency/balances/all');
  }
}
