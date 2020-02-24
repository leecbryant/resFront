import { Component, OnInit } from '@angular/core';
import { SnackBar } from '../_services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CardSwipeDialog } from '../_dialogs/cardswipe.dialog';
import { StudyCheckinDialog } from '../_dialogs/trackers/study-checkin.dialog';

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {
    constructor(private snackbar: SnackBar, public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    StudyTracker() {
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
}
