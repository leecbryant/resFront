import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component ({
    templateUrl: 'settings.html'
})

export class SettingsComponent implements OnInit {
    dtOptions: DataTables.Settings = {};
    
    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers'
        };
    }
}