import { Component, OnDestroy, OnInit } from '@angular/core';
import { DolarApiService } from '../services/dolar-api.service';
import { AuthService, IUser } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, concatMap, filter, map, shareReplay, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  dolar: any[] = [];
  dolarBlue: any;
  dolarOficial: any;

  userAuthenticated$: Observable<boolean>;
  userEmail: string | null = null;

  loginURL: string;
  logoutURL: string;

  unsubscribe$ = new Subject<void>();
  
  constructor(
    private dolarApiService: DolarApiService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
      this.userAuthenticated$ = this.authService.userAuth$.pipe(map(user=> !!user), shareReplay())
      this.userEmail = this.authService.getUserEmail();
    this.route.fragment
      .pipe(
        filter(f => f != null && f.length > 0),
        map(fragment => new URLSearchParams(fragment || '')),
        map(params => ({
          access_token: params.get('access_token'),
          id_token: params.get('id_token'),
          error: params.get('error'),
        })),
        filter(res=> res.access_token != null),
        tap(res=> localStorage.setItem('token', res.access_token ?? '')),
        concatMap((res)=> this.authService.getUser(res.access_token ?? '')),
        tap((res: IUser | null)=> {
          if(res != null ){
            this.userEmail = res.email;
            this.router.navigate(['/'])
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
      this.loginURL = `${environment.cognito.domain}/login?client_id=${environment.cognito.userPoolWebClientId}&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=${encodeURIComponent(environment.cognito.redirectTo)}`;
      this.logoutURL = `${environment.cognito.domain}/logout?client_id=${environment.cognito.userPoolWebClientId}&logout_uri=${encodeURIComponent(environment.cognito.redirectTo)}`;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.getDolarOficial();
    this.getDolarBlue();
    this.getDolarAll();
    this.authService.verifyUser();
    setTimeout(() => {
      this.userEmail = this.authService.getUserEmail();
      console.log('User Email:', this.userEmail);
    }, 1000); //

  }

  getDolarAll() {
    this.dolarApiService.getDolarAll().subscribe(dolar => {
      this.dolar = dolar;
    })
  }

  getDolarBlue() {
    this.dolarApiService.getDolarBlue().subscribe(dolarBlue => {
      this.dolarBlue = dolarBlue;
    })
  }

  getDolarOficial() {
    this.dolarApiService.getDolarOficial().subscribe(dolarOficial => {
      this.dolarOficial = dolarOficial;
    })
  }

  onLogoutClicked(){
    this.authService.logout();
    window.location.href=this.logoutURL;
  }
}

