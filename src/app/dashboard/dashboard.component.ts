import { Component, OnInit } from '@angular/core';
import { ThemeConstants } from '../shared/config/theme-constant';

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {
  
    constructor() { }

    public navigation: any;

    multiSelectOptions: any = [
        {
            label: 'Lee Bryant',
            value: 'Lee Bryant',
        }
    ];

    multiSelectConfig: any = {
        delimiter: ',',
        labelField: 'label',
        valueField: 'value',
        searchField: ['label'],
        maxItems: 200,
        persist: false,
        create: function(input) {
            return {
                label: input,
                value: input
            }
        }
    };

    multiSelectValue: string[] = ['reactjs'];

    ngOnInit()  {
    }

}
