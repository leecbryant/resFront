import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="col-md-6">
      <div class="full-height">
        <div class="vertical-align full-height pdd-horizon-70">
          <div class="table-cell">
            <h1 class="text-dark font-size-80 text-light">Oops!</h1>
            <p class="lead lh-1-8">Hello there, You seem to be lost, but don't worry,<br>we'll get you back on track...</p>
            <a href="" class="btn btn-warning">Get Me Back!</a>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-5 ml-auto hidden-sm hidden-xs">
      <div class="full-height height-100">
        <div class="vertical-align full-height">
          <div class="table-cell">
            <img class="img-responsive" src="assets/images/others/404.png" alt="">
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
