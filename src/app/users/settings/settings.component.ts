import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/_services/user.service';
import { SnackBar } from 'src/app/_services/notification.service';

const helper = new JwtHelperService();

@Component ({
    templateUrl: 'settings.html'
})

export class SettingsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    
    //Display Data for Users
    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));
    Name:string;
    UsernameField:string;
    Email:string;
    constructor(private api: UserService,
        private _snackbar: SnackBar) { }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };

        new Promise((resolve, reject) => {
            this.api.getAccountInfo(localStorage.getItem('token')).subscribe(res => {
                this.Name = res.Name;
                this.UsernameField = res.Username;
                this.Email = res.Email;
                resolve(true);
            }, err => {
                reject(false);
            })
        });
    }
}