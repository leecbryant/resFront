import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../_services/user.service';
import { SnackBar } from '../_services/notification.service';

const helper = new JwtHelperService();

@Component({
    selector: 'app-dashboard',
    templateUrl: './common-layout.component.html'
})


export class CommonLayoutComponent implements OnInit {

    public app : any;
    public headerThemes: any;
    public changeHeader: any;
    public sidenavThemes: any;
    public changeSidenav: any;
    public changeRTL: any;
    public headerSelected: any;
    public sidenavSelected : any;
    public searchActived : any;
    public searchModel: any;
    public Name: string;

    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));

    constructor(private userService: UserService, private snackbar: SnackBar) {
        this.app = {
            layout: {
                sidePanelOpen: false,
                isMenuOpened: true,
                isMenuCollapsed: false,
                themeConfigOpen: false,
                rtlActived: false,
                searchActived: false
            }
        };  

        this.headerThemes = ['header-default', 'header-primary', 'header-info', 'header-success', 'header-danger', 'header-dark'];
        this.changeHeader = changeHeader;

        // Default Values
        this.headerSelected = this.decodedToken['Header'];
        this.sidenavSelected = this.decodedToken['SideNav'];
        this.app.layout.rtlActived = this.decodedToken['RTL'];

        function changeHeader(headerTheme) {
            this.headerSelected = headerTheme;
            this.updateDB();
        }
    
        this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
        this.changeSidenav = changeSidenav;
    
        function changeSidenav(sidenavTheme) {
            this.sidenavSelected = sidenavTheme;
            this.updateDB();
        }

        this.changeRTL = changeRTL;
        function changeRTL() {
            this.app.layout.rtlActived = !this.app.layout.rtlActived;
            this.updateDB();
        }

    }

    ngOnInit() {
        this.Name = this.decodedToken['Name']
        this.headerSelected = this.decodedToken['Header'];
        this.sidenavSelected =this.decodedToken['SideNav'];
        this.app.layout.rtlActived = this.decodedToken['RTL'];
    }

    updateDB() {
        let obj = {
            Header: this.headerSelected,
            SideNav: this.sidenavSelected,
            RTL: this.app.layout.rtlActived,
            token: localStorage.getItem('token')
        }

        this.userService.updateAccessibility(obj).subscribe(res => {
            // DB Updated successfully
            localStorage.setItem('token', res.token)
        }, err => {
            this.snackbar.sendError("Unable to update user preferences. Please try again later.")
            console.log(err);
        })
    }
}
