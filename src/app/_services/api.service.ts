// Core angular
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable,  } from 'rxjs';
// Custom
import { environment } from '../../environments/environment';
import { Hall } from '../_interfaces/hall.interface';
import { Student } from '../_interfaces/student.interface';

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

  getHalls(): Observable<Hall> {
    return this.http.get<Hall>(environment.serverName + 'api/base/halls', );
  }  

  getStudents(): Observable<Student> {
    return this.http.get<Student>(environment.serverName + 'api/base/students', );
  }

  newStudent(data): Observable<any> {
    return this.http.post<any>(environment.serverName + 'api/base/students', data, {
      reportProgress: true,
      observe: 'response'
    });
  }
}
