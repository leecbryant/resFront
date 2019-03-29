import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component ({
    templateUrl: 'currency.html',
    styleUrls: ['../../../assets/scss/plugins/_datepicker.scss']
})

export class CurrencyComponent implements OnInit {
    constructor() { }

    public navigation: any; 

    dtOptions: DataTables.Settings = {};

    singleSelectOptions: any = [
        {
            label: 'Lee Bryant - \t 10',
            value: '10',
            code: '10'
        }
    ];

    singleSelectConfig: any = {
        labelField: 'label',
        valueField: 'value',
        searchField: ['label']
    };

    singleSelectValue: string[] = ['reactjs'];

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
}