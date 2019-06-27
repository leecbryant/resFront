import { Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class SnackBar  {
  name = 'Angular 6';

    constructor(protected snack: MatSnackBar) {}

    sendSuccess(msg: string) {
        this.snack.open('Success: ' + msg, 'X', { duration: 3000, panelClass: ['alert-success']});
    }

    sendWarning(msg: string) {
        this.snack.open('Warning: ' + msg, 'X', { duration: 3000, panelClass: ['alert-warning']});
    }

    sendError(msg: string) {
        this.snack.open('Error: ' + msg, 'X', { duration: 3000, panelClass: ['alert-error']});
    }

}
