import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const AppRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: CommonLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'currency',
                loadChildren: './currency/currency.module#CurrencyModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                canActivate: [AuthGuard]
            },
        ],
    },
    {
        path: 'login',
        component: LoginComponent,
        data : {
            title : 'Reslife Management Login'
        }
    },
    {
        path: 'register/:hash',
        component: RegisterComponent,
        data : {
            title : 'Reslife Registration'
        }
    },
    {
        path: 'logout',
        redirectTo: 'login',
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

