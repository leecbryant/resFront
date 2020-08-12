import { Component, OnInit } from '@angular/core';
import { SnackBar } from '../_services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CardSwipeDialog } from '../_dialogs/cardswipe.dialog';
import { StudyCheckinDialog } from '../_dialogs/trackers/study-checkin.dialog';
import { StudyCheckoutDialog } from '../_dialogs/trackers/study-checkout-dialog';
import { APIService } from '../_services/api.service';
import { Cards } from '../_interfaces/card.interface';

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {
    constructor(private snackbar: SnackBar, public dialog: MatDialog, private api: APIService) {} 
    Cards: Cards;
    
    loaded = false;
    ngOnInit() {
        this.api.getCards().subscribe(res => {
            this.Cards = res;
            this.loaded = true;
        }, err => {
            this.loaded = false;
            this.snackbar.sendError("Unable to load dashboard at this time")
        });
    }

    StudyCheckin() {
        const dialogRef = this.dialog.open(StudyCheckinDialog, {
            width: '600px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    StudyCheckout() {
        const dialogRef = this.dialog.open(StudyCheckoutDialog, {
            width: '800px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    callFunction(name: string) {
        if(name == "StudyCheckout") {
            this.StudyCheckout();
        }
        if(name == "StudyCheckin") {
            this.StudyCheckin();
        }
    }
}
