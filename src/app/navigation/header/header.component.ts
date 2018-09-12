import { Store } from '@ngrx/store';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../app.reducer';
import { Observable } from 'rxjs';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	@Output() sidenavToggle = new EventEmitter<void>();
	isAuth$: Observable<boolean>;
	authSubscription: Subscription;

	constructor( private authService: AuthService, private store: Store<fromRoot.State> ) { }

	onToggleSidenav(){
		this.sidenavToggle.emit();
	}

	onLogout(){
		this.authService.logout();
	}

	ngOnInit() {
		this.isAuth$ = this.store.select( fromRoot.getIsAuth );
	}

}
