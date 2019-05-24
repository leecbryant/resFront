import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

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

    decodedToken:string = helper.decodeToken(localStorage.getItem('token'));
    Accessibility:string = this.decodedToken['Accessibility'];
    Name:string = this.decodedToken['Name'];
    constructor() {
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
    
        function changeHeader(headerTheme) {
            this.headerSelected = headerTheme;

        }
    
        this.sidenavThemes = ['sidenav-default', 'side-nav-dark'];
        this.changeSidenav = changeSidenav;
    
        function changeSidenav(sidenavTheme) {
            this.sidenavSelected = sidenavTheme;
        }

        this.changeRTL = changeRTL;
        function changeRTL() {
            this.app.layout.rtlActived = !this.app.layout.rtlActived;
        }

    }

    ngOnInit(){
        this.changeHeader(this.Accessibility.split(':')[0]);
        this.changeSidenav(this.Accessibility.split(':')[1]);
        if(this.Accessibility.split(':')[2] == "true") {
            this.app.layout.rtlActived = true;
        } else {
            this.app.layout.rtlActived = false;
        }
    }
}
