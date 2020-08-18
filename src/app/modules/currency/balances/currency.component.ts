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
    ngOnInit(): void {
        this.api.getAllBalanceS().subscribe(res => {
            this.BalanceArray = res.data.filter(key => {
                return key.HallID == this.user.getTokenData()['SessionHall'];
            });
        }, 
        err => {
            this.snack.sendError("Error grabbing balances");
        })
    }

    _filter() {
        const filterValue = this.Student.toLowerCase();

        this.BalanceArray = this.BalanceArray.filter(option => option.FirstName.toLowerCase().indexOf(filterValue) === 0);
    }

    submit(form) {
        this.userSelected = true;
        this.userLoaded = false;

        this.api.getAllBalanceS().subscribe(res => {
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
            total += this.BalanceArray[i].Amount;
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
}