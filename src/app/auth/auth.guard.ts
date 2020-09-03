import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    Usuario;
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        this.Usuario = JSON.parse(localStorage.getItem('usuario'));
        if (this.Usuario) {
            return true;
        }

        this.router.navigate(['login']);
        return false;
    }
}