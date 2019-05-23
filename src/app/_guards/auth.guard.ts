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
            console.log(this.decodedToken['Expiration']);
                return true;
        } else {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
            return false;
        }
    }
}