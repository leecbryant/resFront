import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { UserRoutes } from './users-routing.module';

//Tables Component
import { SettingsComponent } from './settings/settings.component';


@NgModule({
    imports: [
        RouterModule.forChild(UserRoutes),
        DataTablesModule
    ],
    declarations: [
        SettingsComponent
    ]
})
export class UsersModule { }