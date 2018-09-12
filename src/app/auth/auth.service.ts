import { UIService } from './../shared/ui.service';
import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';

@Injectable()
export class AuthService{

	authChange = new Subject<boolean>();
	private isAuthenticated = false;

	constructor(
		private router: Router,
		private afAuth: AngularFireAuth,
		private trainingService: TrainingService,
		private snakBar: MatSnackBar,
		private uiService: UIService,
		private store: Store<{ ui: fromRoot .State }>
	){}

	registerUser( authData: AuthData ){
		//this.uiService.loadingStateChanged.next( true );
		this.store.dispatch( new UI.StartLoading());
		this.afAuth.auth.createUserWithEmailAndPassword( authData.email, authData.password )
		.then( result => {
			//this.uiService.loadingStateChanged.next( false );
			this.store.dispatch(new UI.StopLoading());
		})
		.catch( err => {
				this.store.dispatch(new UI.StopLoading ());
				this.snakBar.open(err.message, null, { duration: 3000 })
			}
		);
	}

	login( authData: AuthData ){
		//this.uiService.loadingStateChanged.next( true );
		this.store.dispatch(new UI.StartLoading());
		this.afAuth.auth.signInWithEmailAndPassword( authData.email, authData.password )
		.then(( result ) => {
			//this.uiService.loadingStateChanged.next( false );
			this.store.dispatch(new UI.StopLoading ());
		})
		.catch( err =>
			{
				this.store.dispatch(new UI.StopLoading ());
				this.snakBar.open(err.message, null, { duration: 3000 })
			}
		);
	}

	initAuthListener(){
		this.afAuth.authState.subscribe( user => {
			if( user ){
				this.isAuthenticated = true;
				this.authChange.next( true );
				this.router.navigate(['/training']);
			}else{
				this.trainingService.cancelSubscription();
				this.authChange.next( false );
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
			}
		});
	}

	logout(){
		this.afAuth.auth.signOut();
	}

	isAuth(){
		return this.isAuthenticated;
	}

}
