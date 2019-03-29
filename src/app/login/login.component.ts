import { Component, OnInit, Input } from '@angular/core';
import { NgSelectizeModule } from 'ng-selectize';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {

  constructor() { }

  hallSelectOptions: any = [
      {
          label: 'Lee Bryant',
          value: 'Lee Bryant',
      }
  ];

  hallSelectConfig: any = {
      delimiter: ',',
      labelField: 'label',
      valueField: 'value',
      searchField: ['label'],
      maxItems: 200,
      persist: false,
      create: function(input) {
          return {
              label: input,
              value: input
          }
      }
  };

  hallSelectValue: string[] = ['halls'];

  ngOnInit() {
  }

}
