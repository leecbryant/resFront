import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from '../_services/notification.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './cardswipe.dialog.html'
})
export class CardSwipeDialog {
  // Card Data
  CardData: string;
  CardNumber: string;
  FirstName: string;
  LastName: string;
  ExpData: string;
  
  CardGrabber: string;
  CardReady = true;
  message: string = ""
  cancelButtonText = "Cancel"
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<CardSwipeDialog>,
    private snackbar: SnackBar) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(form): void {
    this.CardData = form.value.carddata;
    if(this.CardData.indexOf("^") !== -1) {
      let details1 = this.CardData.split("^");
    
      this.CardNumber = details1[0];
      this.CardNumber = this.CardNumber.substring(2);
      if(details1[1].includes("/")) { 
        let names = details1[1].split("/");
        this.FirstName = names[1];
        this.LastName = names[0];
        if(details1[2].includes(";")) {
          var details2 = details1[2].split(";");
          if(details2[1].includes("=")) {
            details2 = details2[1].split("=");
            
            this.ExpData = details2[1];
            this.ExpData = this.ExpData.substring(0, this.ExpData.length - 1);
            this.ExpData = this.ExpData.substring(2, 3) + "/" + this.ExpData.substring(0,1);
            this.CardReady = true;
          } else {
            this.CardReady = false;
          }
        } else {
          this.CardReady = false;
        }
      } else {
        this.CardReady = false;
      }
    } else {
      this.CardReady = false;
    }

    if(this.CardReady) {
      let obj = {
        CardNumber: this.CardNumber,
        FirstName: this.FirstName,
        LastName: this.LastName,
        ExpData: this.ExpData
      }
      
      this.dialogRef.close(obj);
    } else {
      form.reset();
      this.snackbar.sendError("Invalid card. Please swipe again")
    }
  }

  keyDownFunction(event, form) {
    if(event.keyCode == 13) {
      if(form.valid) this.onConfirmClick(form);
    }
  }

}