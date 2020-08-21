import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { APIService } from 'src/app/_services/api.service';
import { AllBalances, AllBalanceData } from 'src/app/_interfaces/balances-all.interface';
import { SnackBar } from 'src/app/_services/notification.service';
import { UserService } from 'src/app/_services/user.service';

@Component ({
    templateUrl: 'currency.html',
    // styleUrls: ['../../../assets/scss/plugins/_datepicker.scss']
})

export class CurrencyComponent implements OnInit {
    constructor(private api: APIService, private snack: SnackBar, private user: UserService) { }

    BalanceArray: AllBalanceData[];
    Student = '';

     // Loaders
     userSelected = false;
     userLoaded = true;
     displayData = false;

    loaded = false;
    ngOnInit(): void {
        new Promise((resolve, reject) => {
            this.api.getAllBalancesUnique().subscribe(res => {
                this.BalanceArray = res.data.filter(key => {
                    return key.HallID == this.user.getTokenData()['SessionHall'];
                });
                console.log(this.BalanceArray)
                resolve();
            }, 
            err => {
                this.snack.sendError("Error grabbing balances: " + err);
                reject()
            });
        }).then(result => {
            this.loaded = true;
        }, err => {
            console.log(err)
        });
    }

    _filter() {
        const filterValue = this.Student.toLowerCase();

        this.BalanceArray = this.BalanceArray.filter(option => option.FirstName.toLowerCase().indexOf(filterValue) === 0);
    }

    submit(form) {
        this.userSelected = true;
        this.userLoaded = false;

        this.api.getAllBalances().subscribe(res => {
            this.BalanceArray = res.data.filter(e => {
                return e.StudentID === form && e.Time != null
            });
            this.userLoaded = true;
            this.displayData = true;
            }, err => {
        });
        console.log(form)
    }

    getBalance() {
        var total = 0;
        for(var i = 0; i < this.BalanceArray.length; i++){
            if(this.BalanceArray[i].LogType == "E")
                total += this.BalanceArray[i].Amount;
            else 
                total -= this.BalanceArray[i].Amount;
        }
        return total;
    }

    getName() {
        return this.BalanceArray[0].FirstName + " " + this.BalanceArray[0].LastName;
    }

    getHallCurrency() {
        return this.BalanceArray[0].Currency;
    }

    getTransactTotal() {
        return this.BalanceArray.length;
    }

    refreshComponent() {
        this.Student = '';
         // Loaders
        this.userSelected = false;
        this.userLoaded = true;
        this.displayData = false;

        this.loaded = false;
        new Promise((resolve, reject) => {
            this.api.getAllBalancesUnique().subscribe(res => {
                this.BalanceArray = res.data.filter(key => {
                    return key.HallID == this.user.getTokenData()['SessionHall'];
                });
                console.log(this.BalanceArray)
                resolve();
            }, 
            err => {
                this.snack.sendError("Error grabbing balances: " + err);
                reject()
            });
        }).then(result => {
            this.loaded = true;
        }, err => {
            console.log(err)
        });
    }
}