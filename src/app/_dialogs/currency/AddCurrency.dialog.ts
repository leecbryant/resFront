import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SnackBar } from '../../_services/notification.service';
import { APIService } from '../../_services/api.service';
import { Student } from '../../_interfaces/student.interface';
import { EarnableCurrency, EarnableCurrencyData } from 'src/app/_interfaces/currency-earnable.interface';
import { ResidentData } from 'src/app/_interfaces/resident.interface';
import { AddResidentDialog } from '../addresident.dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './AddCurrency.dialog.html'
})
export class AddCurrencyDialog {
  Data: Student;


  SelectedReason: Number;
  SelectedResidents: Number[] = [];

  CardGrabber: string;
  CardReady = true;
  message: string = ""
  cancelButtonText = "Cancel"
  loading = true;
  submit = false;

  Earnable: EarnableCurrencyData[];
  Residents: ResidentData[];
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCurrencyDialog>,
    private snackbar: SnackBar,
    private api: APIService,
    public dialog: MatDialog) {
    if (data) {
      this.Earnable = data.Earnable;
      this.Residents = data.Residents;
      console.log(this.Earnable)
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  async onSubmit(form) {
    await this.SelectedResidents.forEach(resi => {
      let submitObj = {
        token: localStorage.getItem('token'),
        StudentID: resi,
        Type: 'E',
        TypeID: this.SelectedReason
      }

      console.log(submitObj)
      new Promise((resolve, reject) => {
        this.api.newCurrencyEarnable(submitObj).subscribe(res => {
          resolve();
        }, err => {
          reject();
          console.log(err);
        })
      });
    });
    this.dialogRef.close();
    this.snackbar.sendSuccess("Currency added to student(s)");
  }

  AddResi() {
    const dialogRef = this.dialog.open(AddResidentDialog, {
        panelClass: 'custom-dialog-container',
        width: '800px',
        autoFocus: false,
        data: {
        message: 'HelloWorld',
        buttonText: {
            cancel: 'Done'
            }
        },
    }).afterClosed().subscribe(res => {
      if(res) {
        let newResident:  ResidentData = {id: res.id, FirstName: res.firstname, LastName: res.lastname, CardNumber: '', HallID: res.hall, Room: res.room};
        this.Residents.push(newResident);
        this.SelectedResidents = [...this.SelectedResidents, res.id];     
      }
    });
  }
}