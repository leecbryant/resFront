import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ThemeConstants } from '../shared/config/theme-constant';

import { DashboardRoutes } from './dashboard-routing.module';

// Dashboard Component
import { DashboardComponent } from './dashboard.component';

//Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';

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
