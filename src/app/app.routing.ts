import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

// Layouts
import { CommonLayoutComponent } from './common/common-layout.component';
import { AuthGuard } from './_guards';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { StudyHoursLogComponent } from './modules/studyhours/study-log.component';
import { Page404Component } from './_helpers/404/404.component';
import { Page500Component } from './_helpers/500/500.component';
import { ResetComponent } from './users/reset/reset.component';

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
                loadChildren: './modules/currency/currency.module#CurrencyModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'users',
                loadChildren: './users/users.module#UsersModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'studyhours',
                component: StudyHoursLogComponent,
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
        path: 'reset/:hash',
        component: ResetComponent,
        data : {
            title : 'Password Reset'
        }
    },
    {
        path: 'logout',
        redirectTo: 'login',
    },
    {
        path: '**',
        component: Page404Component
    },
    {
        path: '*',
        component: Page500Component
    }
];

