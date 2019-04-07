import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    token:string=localStorage.getItem('token');
    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));

    constructor(
        private router: Router,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(localStorage.getItem('token')) {
            if(parseInt(this.decodedToken["Expiration"]) > Date.now()) {
                return true;
            } else {
                console.log("ERROR0");
                return true;
            }
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}