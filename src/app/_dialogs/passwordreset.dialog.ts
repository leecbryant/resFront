import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBar } from '../_services/notification.service';
import { APIService } from '../_services/api.service';
import { Student } from '../_interfaces/student.interface';
import { rejects } from 'assert';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './passwordreset.dialog.html'
})
export class PasswordResetDialog {
  Data: Student;
  Email = '';
  message: string = ""
  cancelButtonText = "Cancel"
  loading = false;
  submit = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<PasswordResetDialog>,
    private snackbar: SnackBar,
    private user: UserService) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onSubmit(form) {
    this.loading = true;
    this.user.resetPassword(form.value).subscribe(res => {
      this.snackbar.sendSuccess("If the email exists, an email has been sent to reset your password.");
      this.dialogRef.close(true);
      this.loading = false;
    },  err => {
      this.snackbar.sendError("Unable to submit password request: Error - " + err)
    });
  }
}