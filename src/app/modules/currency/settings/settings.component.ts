import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/_services/api.service';
import { SnackBar } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { StudyArray } from 'src/app/_interfaces/study.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialog } from 'src/app/_dialogs/confirm.dialog';
import { LoggableCurrency, LoggableCurrencyData } from 'src/app/_interfaces/loggable.interface';

@Component ({
    templateUrl: 'settings.html'
})

export class CurrencySettingsComponent implements OnInit {
    constructor(private api: APIService, private snack: SnackBar, private user: UserService,
                public dialog: MatDialog) { }
    // Data Table Earnable
    displayedColumnsEarnable: string[] = ['Name', 'Amount', 'checkout'];
    dataSourceEarnable: MatTableDataSource<LoggableCurrencyData>;
    LoggableArray: LoggableCurrencyData[] = [];

    @ViewChild(MatPaginator, {static: true}) paginatorEarnable: MatPaginator;
    @ViewChild(MatSort, {static: true}) sortEarnable: MatSort;
    
    // Data Table Sellable
    displayedColumnsSellable: string[] = ['Name', 'Amount', 'checkout'];
    dataSourceSellable: MatTableDataSource<LoggableCurrencyData>;
    LoggableArraySellable: LoggableCurrencyData[] = [];

    @ViewChild(MatPaginator, {static: true}) paginatorSellable: MatPaginator;
    @ViewChild(MatSort, {static: true}) sortSellable: MatSort;

    loaded = false;
    async ngOnInit() {
        await new Promise((resolve, reject) => {
            this.api.getCurrencyLoggable().subscribe(res => {
                // Earnable Table
                this.dataSourceEarnable = new MatTableDataSource(res.data.filter(ele => {
                    return ele.Hall == this.user.getTokenData()['SessionHall'] && ele.Type == "E";
                }));
                this.dataSourceEarnable.paginator = this.paginatorEarnable;
                this.dataSourceEarnable.sort = this.sortEarnable;   
                
                // Sellable Table
                this.dataSourceSellable = new MatTableDataSource(res.data.filter(ele => {
                    return ele.Hall == this.user.getTokenData()['SessionHall'] && ele.Type == "S";
                }));
                this.dataSourceSellable.paginator = this.paginatorSellable;
                this.dataSourceSellable.sort = this.sortSellable;   

                // Universal
                this.LoggableArray = res.data;
                resolve();
            }, err => {
                console.log(err);
                this.snack.sendError(err);
                reject() 
            });
        }).then(res => {
            this.loaded = true;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSourceEarnable.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSourceEarnable.paginator) {
          this.dataSourceEarnable.paginator.firstPage();
        }
      }
    
    checkout(row) {
        this.dialog.open(ConfirmDialog, {
            width: '300px',
            autoFocus: false,
            data: {
            message: 'Are you sure you want to delete the item?',
            buttonText: {
                cancel: 'Cancel',
                submit: 'Submit'
                }
            },
        }).afterClosed().subscribe(res => {
            if(res) {
                let submitObj = {
                row
                }
                this.api.updateStudy(submitObj).subscribe(studyres => {
                this.dataSourceEarnable.data = this.LoggableArray = this.dataSourceEarnable.data.filter(e => {
                    return e.id != row.id
                })
                this.dataSourceSellable.data = this.LoggableArray = this.dataSourceEarnable.data.filter(e => {
                    return e.id != row.id
                })
                }, err => {
                    console.log(err)
                })
            } else {
                // User elected to not delete item
            }
        });
    }
    doNothing() {
        return false;
    }
}