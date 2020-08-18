import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from '../_services/notification.service';
import { APIService } from '../_services/api.service';
import { Student } from '../_interfaces/student.interface';
import { rejects } from 'assert';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './addresident.dialog.html'
})
export class AddResidentDialog {
  Data: Student;
  // Card Data
  FirstName: string;
  LastName: string;
  RoomNumber: string;

  message: string = ""
  cancelButtonText = "Cancel"
  loading = false;
  submit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddResidentDialog>,
    private snackbar: SnackBar,
    private api: APIService,
    private user: UserService) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  async onSubmit(form) {
    await new Promise((resolve, reject) => {
      this.api.newStudent({ form: form.value, token: localStorage.getItem('token')}).subscribe(res => {
        resolve();
        this.dialogRef.close({id: res.body.data.insertId, firstname: this.FirstName, lastname: this.LastName, hall: this.user.getTokenData()['SessionHall'], room: this.RoomNumber});
      },
      err => {
        this.snackbar.sendError("Error: " + err);
        this.loading = true;
        reject();
      });
    });
    this.loading = true;
  }
}