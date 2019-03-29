import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthenticationLayoutComponent } from './common/authentication-layout.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'currency',
                loadChildren: './currency/currency.module#CurrencyModule'
            }, 
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule'
            }, 
        ],
    },
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: 'logout', 
        redirectTo: 'login',
    },
    { 
        path: '**', 
        component: PageNotFoundComponent 
    },
    { 
        path: 'admin', 
        component: PageNotFoundComponent, 
        data: { 
          expectedRole: 'admin'
        } 
      },
];

