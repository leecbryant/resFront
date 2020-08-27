import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SnackBar } from '../../_services/notification.service';
import { APIService } from '../../_services/api.service';
import { Student } from '../../_interfaces/student.interface';
import { LoggableCurrencyData } from 'src/app/_interfaces/loggable.interface';
import { ResidentData } from 'src/app/_interfaces/resident.interface';
import { AddResidentDialog } from '../addresident.dialog';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './AddEditLoggable.dialog.html'
})
export class AddEditLoggableDialog {
  Data: Student;


  Title = '';
  Cost = 0;
  Hash = '';
  Edit = false;

  message: string = ""
  cancelButtonText = "Cancel"
  loading = true;
  submit = false;
  Type: string;
  Loggable: LoggableCurrencyData[];
  Residents: ResidentData[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddEditLoggableDialog>,
    private snackbar: SnackBar,
    private api: APIService,
    public dialog: MatDialog,
    private user: UserService) {
    if (data) {
      this.Type = data.Type;
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
      if(data.Row) {
        this.Cost = data.Row.Amount
        this.Title = data.Row.Name
        this.Hash = data.Row.Hash
        this.Edit = true
      }
    }
  }

  async onSubmit(form) {
    if(!this.Edit) {
      await new Promise((resolve, reject) => {
        this.api.newLoggableCurrency({form: form.value, type: this.Type}).subscribe(res => {
          this.snackbar.sendSuccess(this.Type == "E" ? "Earnable method added" : "Sellable item added");
          this.dialogRef.close({id: res.data.insertId, Type: this.Type, Hall: this.user.getTokenData()['SessionHall'], Title: form.value.title, Amount: form.value.cost, Hash: res.hash});
          resolve();
        }, err => {
          this.snackbar.sendError(err);
          reject();
        });
      })
    } else {
      await new Promise((resolve, reject) => {
        this.api.editLoggableCurrency({form: form.value, hash: this.Hash}).subscribe(res => {
          this.snackbar.sendSuccess(this.Type == "E" ? "Earnable method editted" : "Sellable item editted");
          console.log(res)
          this.dialogRef.close({Type: this.Type, Hall: this.user.getTokenData()['SessionHall'], Title: form.value.title, Amount: form.value.cost, Hash: res.hash});
          resolve();
        }, err => {
          this.snackbar.sendError(err);
          reject();
        });
      });
    }
  }
}