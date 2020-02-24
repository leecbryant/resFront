import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';

//Dashboard Components
import { CurrencyComponent } from './balances/currency.component';

export const CurrencyRoutes: Routes = [
    {
        path: '',
        redirectTo : '/currency/balances' 
    },
    {
        path: '',
        children: [
            {
                path: 'balances',
                component: CurrencyComponent,
                data: {
                    title: 'Hall Balances'
                }
            }
        ]
    }
];

