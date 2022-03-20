import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if(this.authService.isAutenticated()){
        if(this.isTokenExpired()){
          this.authService.logout();
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }

  isTokenExpired():boolean{
    let token = this.authService.getToken;
    let fechaActual = new Date().getTime() / 1000; //obtenemos la fecha actual en milisegundos al dividirla entre 1000 la obtenemos en segundos.
    let payload = this.authService.obtenerPayloadToken(token);
    console.log(payload);
    if(payload.exp < fechaActual) return true;
    return false;
  }

}
