import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { APIService } from 'src/app/_services/api.service';
import { SnackBar } from 'src/app/_services/notification.service';

@Component({
  selector: 'app-study-checkin-dialog',
  templateUrl: './study-checkin.dialog.html'
})
export class StudyCheckinDialog implements OnInit {
  swipeObj: any;
  Name = '';
  message: string = "";
  cancelButtonText = "Cancel";
  Reason = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StudyCheckinDialog>,
    private ds: DialogService,
    private api: APIService,
    private snack: SnackBar) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    this.ds.openSwipeDialog().subscribe(res => {
      if(res != null) {
        this.swipeObj = res;
        this.Name = this.swipeObj.FirstName + " " + this.swipeObj.LastName      
      } else {
        this.dialogRef.close(false);
      }
    })
  }

  onSubmit(form): void {
    let submitObj = {
      reason: form.value.reason,
      swipeData: this.swipeObj,
      token: localStorage.getItem('token')
    }
    this.api.newStudy(submitObj).subscribe(res => {
      this.snack.sendSuccess("Study visit initiated");
      this.dialogRef.close(true);
    })
  }

}