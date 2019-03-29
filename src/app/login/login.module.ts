import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';

import { LoginRoutes } from './login-routing.module';

// Dashboard Component
import { LoginComponent } from './login.component';

//Imports
import { CommonModule } from '@angular/common';
import { NgSelectizeModule } from 'ng-selectize';


@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes),
        NgSelectizeModule,
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        ThemeConstants
    ]
})

export class LoginModule { 
}
