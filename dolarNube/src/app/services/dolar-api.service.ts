
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DolarApiService {

  private url = 'https://dolarapi.com/v1/';

  constructor(private httpClient: HttpClient) { }

  public getDolar(): Observable <any>{
    return this.httpClient.get<any>(this.url + 'dolares')
  }

}
