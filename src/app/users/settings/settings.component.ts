import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Component ({
    templateUrl: 'settings.html'
})

export class SettingsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    
    //Display Data for Users
    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));
    Name:string = this.decodedToken['Name'];
    UsernameField:string = this.decodedToken['Username'];
    Email:string = 'tester@test.com';

    //Form Handling


    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
}