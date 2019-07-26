// Base Angular
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule, MatToolbarModule , MatMenuModule, MatTooltipModule,
  MatSortModule, MatCheckboxModule, MatSelectModule, MatProgressBarModule,
  MatTableModule, MatFormFieldModule, MatInputModule, MatPaginatorModule,
  MatRadioModule, MatButtonModule, MatTabsModule, MatDialogModule,
  MatProgressBar, MatSnackBarModule, MatProgressSpinnerModule,
  MatAutocompleteModule, MatStepperModule } from '@angular/material';
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
import { PageNotFoundComponent } from './_helpers/page-not-found/page-not-found.component';

// Directives
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { Cards_Directives } from './shared/directives/cards.directive';

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
        MatAutocompleteModule, MatStepperModule
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
        PageNotFoundComponent,
        // Removes Animations
        // NoopAnimationsModule,
    ],
    providers: [
        UserService
    ],
    bootstrap: [AppComponent]
})


export class AppModule { }
