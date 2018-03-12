import  { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private router: Router){}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
		if(localStorage.getItem('currentUser')){
			console.log('1');
			return true;
		}
		this.router.navigate(['/Login'], { queryParams: { returnUrl: state.url }});
		return false;
	}
}