import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { UserRoutes } from './users-routing.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
//Tables Component
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    imports: [
        RouterModule.forChild(UserRoutes),
        DataTablesModule,
        FormsModule,
        CommonModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class UsersModule { }