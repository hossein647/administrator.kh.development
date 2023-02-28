import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { delay, map, Observable, of } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginResolver implements Resolve<boolean> {

  constructor(
    private loginService: LoginService,
    private router: Router,
  ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.loginService.hasCookie().pipe(
      map(res => {
        console.log('login resolver : ', res);
        
        const pageRoute: string = route.data['route'];  
        console.log("page route : ", pageRoute, res?.loggedIn);
        
        if (res?.loggedIn) {
          if (pageRoute === 'dashboard') return true;
            this.router.navigate(['dashboard']);
          return null;
        } else {
          if (pageRoute === 'login') return true;
          this.router.navigate(['login']);
          return null;
        }
      }),
    )
  }
}
