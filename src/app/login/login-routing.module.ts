import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

//Dashboard Components
import { LoginComponent } from './login.component';

export const LoginRoutes: Routes = [
    {
        path: '',
        component: LoginComponent,
        data: {
           title: 'Reslife Management | Login'
        }
    }
];

