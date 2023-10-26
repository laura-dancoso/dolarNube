import { Component, OnInit } from '@angular/core';
import { DolarApiService } from '../services/dolar-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dolar: any [] = [];

  constructor(private dolarApiService : DolarApiService) { }

  ngOnInit() {
    this.getDolar();
  }

  getDolar(){
    this.dolarApiService.getDolar().subscribe (dolar => {
      this.dolar = dolar;
      console.log (this.dolar)
    })
  }
}

