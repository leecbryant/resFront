// Base Angular
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgSelectizeModule } from 'ng-selectize';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete'
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

// Multi Select
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// Services
import { UserService } from './_services/user.service';

// Layout Modules
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

// Custom
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

// Components
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';

// Directives
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { Cards_Directives } from './shared/directives/cards.directive';
import { CardSwipeDialog } from './_dialogs/cardswipe.dialog';
import { StudyCheckinDialog } from './_dialogs/trackers/study-checkin.dialog';
import { StudyCheckoutDialog } from './_dialogs/trackers/study-checkout-dialog';
import { ConfirmDialog } from './_dialogs/confirm.dialog';
import { StudyHoursLogComponent } from './modules/studyhours/study-log.component';
import { AddCurrencyDialog } from './_dialogs/currency/LogCurrency.dialog';
import { AddResidentDialog } from './_dialogs/addresident.dialog';
import { HttpErrorInterceptor } from './_interceptors/http-error.interceptor';
import { Page500Component } from './_helpers/500/500.component';
import { Page404Component } from './_helpers/404/404.component';
import { TokenInterceptor } from './_interceptors/http-token.interceptor';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: false }),
        NgbModule,
        OAuthModule.forRoot(),
        FormsModule,
        PerfectScrollbarModule,
        NgSelectizeModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        // Material Angular Themeing Imports
        MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
        MatRadioModule, MatSelectModule, MatCheckboxModule, MatSortModule,
        MatTooltipModule, MatMenuModule, MatToolbarModule, MatIconModule,
        MatButtonModule, MatTabsModule, MatDialogModule, MatSnackBarModule,
        MatProgressSpinnerModule, MatProgressBarModule,
        MatAutocompleteModule, MatStepperModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgSelectModule
    ],
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        AuthenticationLayoutComponent,
        // Directives
        Sidebar_Directives,
        Cards_Directives,
        // Components
        LoginComponent,
        RegisterComponent,
        // PageNotFoundComponent,
        Page500Component,
        Page404Component,
        // Remgoves Animations
        // NoopAnimationsModule,
        CardSwipeDialog,
        StudyCheckinDialog,
        StudyCheckoutDialog,
        ConfirmDialog,
        StudyHoursLogComponent,
        AddCurrencyDialog,
        AddResidentDialog
    ],
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptor,
            multi: true
          },
          {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true,
          }
        //   { // Fix for 404 error out on refresh
        //       provide: LocationStrategy, 
        //       useClass: HashLocationStrategy
        //   }

    ],
    entryComponents: [CardSwipeDialog, StudyCheckinDialog, StudyCheckoutDialog, ConfirmDialog, AddCurrencyDialog, AddResidentDialog],
    bootstrap: [AppComponent]
})


export class AppModule { }
