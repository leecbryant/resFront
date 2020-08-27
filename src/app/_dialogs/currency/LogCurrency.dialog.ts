import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { SnackBar } from '../../_services/notification.service';
import { APIService } from '../../_services/api.service';
import { Student } from '../../_interfaces/student.interface';
import { LoggableCurrencyData } from 'src/app/_interfaces/loggable.interface';
import { ResidentData } from 'src/app/_interfaces/resident.interface';
import { AddResidentDialog } from '../addresident.dialog';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './LogCurrency.dialog.html'
})
export class AddCurrencyDialog {
  Data: Student;


  SelectedReason: Number;
  SelectedResidents: Number[];
  SelectedResident: Number;
  CardGrabber: string;
  CardReady = true;
  message: string = ""
  cancelButtonText = "Cancel"
  loading = true;
  submit = false;
  Type: string;
  Loggable: LoggableCurrencyData[];
  Residents: ResidentData[];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<AddCurrencyDialog>,
    private snackbar: SnackBar,
    private api: APIService,
    public dialog: MatDialog) {
    if (data) {
      this.Loggable = data.Loggable;
      this.Residents = data.Residents;
      this.Type = data.Type;
      console.log(this.Loggable);
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  async onSubmit(form) {
    if(this.Type == "S") {
      let submitObj = {
        StudentID: this.SelectedResident,
        Type: 'S',
        TypeID: this.SelectedReason
      }
      let Balance = 0;
      console.log(this.SelectedResident)
      new Promise((resolve, reject) => {
        this.api.getAllBalances().subscribe(res => {
          res.data.filter(key => {
            return key.StudentID == this.SelectedResident
          }).forEach(key => {
            if(key.LogType == "E")
              Balance += key.Amount
            else  
              Balance -= key.Amount
          });
          resolve();
        },
        err => {
          reject();
        });
      }).then(obj => {
        console.log(Balance)
        if(this.Loggable.find(key => {
          return key.id == this.SelectedReason
        }).Amount > Balance) {
          this.snackbar.sendError("Balance must be greater than item purchase price")
        } else {
          new Promise((resolve, reject) => {
            this.api.newCurrencyLoggable(submitObj).subscribe(res => {
              resolve();
            }, err => {
              reject();
              console.log(err);
            })
          });
          this.snackbar.sendSuccess("Item sold to student");
          this.dialogRef.close();
        }
      });
    } else {
      await this.SelectedResidents.forEach(resi => {
        let submitObj = {
          StudentID: resi,
          Type: 'E',
          TypeID: this.SelectedReason
        }
        
        new Promise((resolve, reject) => {
            this.api.newCurrencyLoggable(submitObj).subscribe(res => {
              resolve();
            }, err => {
              reject();
              console.log(err);
            })
          });
        this.snackbar.sendSuccess("Currency added to student(s)");
        this.dialogRef.close();
      });
    }
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