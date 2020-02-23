import { Component, OnInit } from '@angular/core';
import { SnackBar } from '../_services/notification.service';

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {

    constructor(private snackbar: SnackBar) {
    }

    ngOnInit() {
        
    }

    addCurrency(form) {
        console.log(form.value)
    }
}
