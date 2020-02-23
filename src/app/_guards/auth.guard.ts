import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../_services/user.service';
import { Observable, BehaviorSubject } from 'rxjs';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    token: string = localStorage.getItem('token');
    decodedToken: string = helper.decodeToken(localStorage.getItem('token'));

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean | Promise<boolean>{
        if(localStorage.getItem('token')) {
            return new Promise((resolve, reject) => {
                this.userService.validate(localStorage.getItem('token')).subscribe(res => {
                    resolve(true);
                }, err => {
                    reject(false);
                });
            }).then(result => {
                return true;
            }).catch(err => {
                this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
                return false;
            });
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }

}
