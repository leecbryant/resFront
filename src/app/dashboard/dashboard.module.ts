import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';

import { DashboardRoutes } from './dashboard-routing.module';

// Dashboard Component
import { DashboardComponent } from './dashboard.component';

//Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgSelectizeModule } from 'ng-selectize';

@NgModule({
    imports: [
        RouterModule.forChild(DashboardRoutes),
        CommonModule,
        FormsModule,
        NgSelectizeModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers: [
        ThemeConstants
    ]
})
export class DashboardModule { 
}
