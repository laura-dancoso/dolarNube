
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolarApiService {

  private url = 'https://dolarapi.com/v1/';

  constructor(private httpClient: HttpClient) { }

  public getDolarAll(): Observable <any>{
    return this.httpClient.get<any>(this.url + 'dolares')
  }

  public getDolarBlue(): Observable <any>{
    return this.httpClient.get<any>(this.url + 'dolares/blue')
  }

  public getDolarOficial(): Observable <any>{
    return this.httpClient.get<any>(this.url + 'dolares/oficial')
  }



}
