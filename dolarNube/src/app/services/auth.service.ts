import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, finalize, map, take, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface IUser{
  username: string,
  email: string,
  name: string,
  token: string
}

@Injectable({
  providedIn: 'root'  
})
export class AuthService {

  private userAuth = new BehaviorSubject<IUser | undefined | null>(undefined);
  public userAuth$ = this.userAuth.asObservable();

  public authLoading = false;
  constructor(private httpClient: HttpClient) {
  }

  getUser(token:string): Observable<IUser | null >{
    this.authLoading = true;
    return this.httpClient.get<IUser>(`${environment.cognito.domain}/oauth2/userInfo`)
    .pipe(
      tap((user:IUser)=> {
        if(user!= null){
          this.userAuth.next(user)
          localStorage.setItem('token', token)
        }
      }),
      map((user)=> user != null ? ({...user, token: token} as IUser) : null),
      catchError((err)=>{
        localStorage.removeItem('token');
        this.userAuth.next(null);
        console.error(err);
        throw err;
      }),
      finalize(()=>{
        this.authLoading= false
      })
    );
  }

  verifyUser(){
    const token = localStorage.getItem('token');
    if(token != null){
      this.getUser(token).pipe(take(1)).subscribe();
    }
  }

  logout(){
    localStorage.removeItem('token');
    this.userAuth.next(null);
  }
}
