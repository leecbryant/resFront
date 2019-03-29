import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

//Dashboard Components
import { SettingsComponent } from './settings/settings.component';

export const UserRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'settings',
                component: SettingsComponent,
                data: {
                    title: 'User Profile'
                }
            }
        ]
    }
];

