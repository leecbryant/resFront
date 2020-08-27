import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

//Dashboard Components
import { CurrencyComponent } from './balances/currency.component';
import { CurrencySettingsComponent } from './settings/settings.component';

export const CurrencyRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: CurrencyComponent,
                data: {
                    title: 'Hall Balances'
                }
            },
            {
                path: 'balances',
                component: CurrencyComponent,
                data: {
                    title: 'Hall Balances'
                }
            },
            {
                path: 'settings',
                component: CurrencySettingsComponent,
                data: {
                    title: 'Currency Settings'
                }
            }
        ]
    }
];

