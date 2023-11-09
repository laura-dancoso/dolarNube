import { Component, OnInit } from '@angular/core';
import { DolarApiService } from '../services/dolar-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  dolar: any [] = [];
  dolarBlue: any ;
  dolarOficial: any;

  constructor(private dolarApiService : DolarApiService) { }

  ngOnInit() {
    this.getDolarOficial();
    this.getDolarBlue();
    this.getDolarAll();
  }

  getDolarAll(){
    this.dolarApiService.getDolarAll().subscribe (dolar => {
      this.dolar = dolar;
    })
  }

  getDolarBlue(){
    this.dolarApiService.getDolarBlue().subscribe (dolarBlue => {
      this.dolarBlue = dolarBlue;
    })
  }

  getDolarOficial(){
    this.dolarApiService.getDolarOficial().subscribe (dolarOficial => {
      this.dolarOficial = dolarOficial;
    })
  }
}

