import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { CardSwipeDialog } from '../_dialogs/cardswipe.dialog';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class DialogService  {
    name = 'Angular 6';
  
    constructor(protected snack: MatSnackBar, private dialog: MatDialog) {}
      
    openSwipeDialog(): Observable<any> {
        const dialogRef = this.dialog.open(CardSwipeDialog,{
            data:{
            message: 'Please swipe a card...',
            buttonText: {
                cancel: 'Cancel'
                }
            },
            autoFocus: true
        });

        return dialogRef.afterClosed();
    }
  }
  