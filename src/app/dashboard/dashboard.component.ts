import { Component, OnInit } from '@angular/core';
import { SnackBar } from '../_services/notification.service';
import { MatDialog } from '@angular/material/dialog';
import { CardSwipeDialog } from '../_dialogs/cardswipe.dialog';
import { StudyCheckinDialog } from '../_dialogs/trackers/study-checkin.dialog';
import { StudyCheckoutDialog } from '../_dialogs/trackers/study-checkout-dialog';
import { APIService } from '../_services/api.service';
import { Cards } from '../_interfaces/card.interface';
import { AddCurrencyDialog } from '../_dialogs/currency/LogCurrency.dialog';
import { LoggableCurrencyData } from '../_interfaces/loggable.interface';
import { UserService } from '../_services/user.service';
import { ResidentData } from '../_interfaces/resident.interface';

@Component({
    templateUrl: 'dashboard.html'
})

export class DashboardComponent implements OnInit {
    constructor(private snackbar: SnackBar, public dialog: MatDialog, private api: APIService, private user: UserService) {} 
    Cards: Cards;
    LoggableCurrency: LoggableCurrencyData[];
    Residents: ResidentData[];
    loaded = false;
    ngOnInit() {
        this.api.getCards().subscribe(res => {
            this.Cards = res;
            this.api.getCurrencyLoggable().subscribe(cur => {
                this.LoggableCurrency = cur.data.filter(key => {
                    return key.Hall == this.user.getTokenData()['SessionHall'];
                });
                console.log(this.LoggableCurrency);
                this.api.getResidents().subscribe(resi => {
                    this.Residents = resi.data.filter(key => {
                        return key.HallID == this.user.getTokenData()['SessionHall'];
                    });
                    this.loaded = true;
                });
            });
        }, err => {
            this.loaded = false;
            this.snackbar.sendError("Unable to load dashboard at this time")
        });
    }

    StudyCheckin() {
        const dialogRef = this.dialog.open(StudyCheckinDialog, {
            width: '600px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    StudyCheckout() {
        const dialogRef = this.dialog.open(StudyCheckoutDialog, {
            width: '800px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    AddCurrency() {
        const dialogRef = this.dialog.open(AddCurrencyDialog, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            Loggable: this.LoggableCurrency.filter(key => {
                return key.Type == "E"
            }),
            Type: "E",
            Residents: this.Residents,
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    SellCurrency() {
        const dialogRef = this.dialog.open(AddCurrencyDialog, {
            panelClass: 'custom-dialog-container',
            width: '800px',
            autoFocus: false,
            data: {
            message: 'HelloWorld',
            Loggable: this.LoggableCurrency.filter(key => {
                return key.Type == "S"
            }),
            Type: "S",
            Residents: this.Residents,
            buttonText: {
                cancel: 'Done'
                }
            },
        }).afterClosed().subscribe(res => {
            // console.log(res)
        });
    }

    callFunction(name: string) {
        if(name == "StudyCheckout") {
            this.StudyCheckout();
        }
        if(name == "StudyCheckin") {
            this.StudyCheckin();
        }
        if(name == "AddCurrency") {
            this.AddCurrency(); 
        }  
        if(name == "SellCurrency") {
            this.SellCurrency();
        }     
    }
}
