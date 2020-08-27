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
import { CurrencySettingsComponent } from './settings/settings.component';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';


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
        MatIconModule,
        // Material Angular Themeing Imports
        MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
        MatRadioModule, MatSelectModule, MatCheckboxModule, MatSortModule,
        MatTooltipModule, MatMenuModule, MatToolbarModule, MatIconModule,
        MatButtonModule, MatTabsModule, MatDialogModule, MatSnackBarModule,
        MatProgressSpinnerModule, MatProgressBarModule,
        MatAutocompleteModule, MatStepperModule,
    ],
    declarations: [
        CurrencyComponent,
        CurrencySettingsComponent
    ]
})
export class CurrencyModule { }