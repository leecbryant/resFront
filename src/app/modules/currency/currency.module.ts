import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';

import { CurrencyRoutes } from './currency-routing.module';

//Tables Component
import { CurrencyComponent } from './balances/currency.component';

//Imports
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ArchwizardModule } from 'angular-archwizard';
import { NgSelectizeModule } from 'ng-selectize';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        RouterModule.forChild(CurrencyRoutes),
        DataTablesModule,
        CommonModule,
        NgSelectizeModule,
        FormsModule
    ],
    declarations: [
        CurrencyComponent
    ]
})
export class CurrencyModule { }