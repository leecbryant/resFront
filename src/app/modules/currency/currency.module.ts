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
import { MatAutocomplete, MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    imports: [
        RouterModule.forChild(CurrencyRoutes),
        DataTablesModule,
        CommonModule,
        NgSelectizeModule,
        FormsModule,
        MatAutocompleteModule,
        MatProgressBarModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        CurrencyComponent
    ]
})
export class CurrencyModule { }