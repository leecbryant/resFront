import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';

// Services
import { LoginService } from './_services/login.service';

//Layout Modules
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';

//Directives
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Sidebar_Directives } from './shared/directives/side-nav.directive';
import { Cards_Directives } from './shared/directives/cards.directive';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// Routing Module
import { AppRoutes } from './app.routing';

// App Component
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgSelectizeModule } from 'ng-selectize';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(AppRoutes, { useHash: false }),
        NgbModule.forRoot(),
        OAuthModule.forRoot(),
        FormsModule,
        PerfectScrollbarModule,
        NgSelectizeModule,
        HttpModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        CommonLayoutComponent,
        AuthenticationLayoutComponent,
        Sidebar_Directives,
        Cards_Directives,
        LoginComponent,
        PageNotFoundComponent
    ],
    providers: [ 
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        LoginService
    ],
    bootstrap: [AppComponent]
})


export class AppModule { }
