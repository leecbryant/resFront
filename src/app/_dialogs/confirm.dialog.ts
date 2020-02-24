import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from '../_services/notification.service';
import { APIService } from '../_services/api.service';
import { Student } from '../_interfaces/student.interface';
import { rejects } from 'assert';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './confirm.dialog.html'
})
export class ConfirmDialog {
  Data: Student;
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
  loading = true;
  submit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmDialog>,
    private snackbar: SnackBar,
    private api: APIService) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick() {
      this.dialogRef.close(true);
  }

  onCancelClick() {
    this.dialogRef.close(false);
  }
}