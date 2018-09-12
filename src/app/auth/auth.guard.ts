import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate{

	constructor( private authService: AuthService, private router: Router, private store: Store<fromRoot.State> ){}

	canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
		return this.store.select( fromRoot.getIsAuth ).pipe( take(1));
	}
}
