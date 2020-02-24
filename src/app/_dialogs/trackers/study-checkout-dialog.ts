import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/_services/dialog.service';
import { APIService } from 'src/app/_services/api.service';
import { SnackBar } from 'src/app/_services/notification.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudyArray } from 'src/app/_interfaces/study.interface';
import { ConfirmDialog } from '../confirm.dialog';

@Component({
  selector: 'app-study-checkout-dialog',
  templateUrl: './study-checkout.dialog.html'
})
export class StudyCheckoutDialog implements OnInit {

  
  swipeObj: any;
  Name = '';
  message: string = "";
  cancelButtonText = "Cancel";


  // Data Table
  displayedColumns: string[] = ['name', 'StartDate', 'checkout'];
  dataSource: MatTableDataSource<StudyArray>;
  StudyArray: StudyArray[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<StudyCheckoutDialog>,
    private ds: DialogService,
    private api: APIService,
    private snack: SnackBar,
    public dialog: MatDialog) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  ngOnInit() {
    this.api.getStudy().subscribe(res => {
      this.dataSource = new MatTableDataSource(res.data.filter(e => {
        return e.EndDate == null
      }));
      this.StudyArray = res.data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;    
    }, err => {
      console.log(err); 
    })
    console.log(this.StudyArray.length)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  checkout(row) {
    this.dialog.open(ConfirmDialog, {
        width: '300px',
        autoFocus: false,
        data: {
        message: 'Are you sure you want to check the student out of your study hours?',
        buttonText: {
            cancel: 'Cancel',
            submit: 'Submit'
            }
        },
    }).afterClosed().subscribe(res => {
        if(res) {
          let submitObj = {
            row,
            token: localStorage.getItem('token')
          }
          this.api.updateStudy(submitObj).subscribe(studyres => {
            this.dataSource.data = this.StudyArray = this.dataSource.data.filter(e => {
              return e.StudyID != row.StudyID
            })
            this.snack.sendSuccess("Student checked out");
          }, err => {
            console.log(err)
          })
        } else {

        }
    });
  }
}