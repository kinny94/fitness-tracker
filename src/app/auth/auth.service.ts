import { UIService } from './../shared/ui.service';

import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';

@Injectable()
export class AuthService{

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
				this.store.dispatch( new Auth.SetAuthenticated());
				this.router.navigate(['/training']);
			}else{
				this.trainingService.cancelSubscription();
				this.store.dispatch( new Auth.SetUnauthenticated());
				this.router.navigate(['/login']);
			}
		});
	}

	logout(){
		this.afAuth.auth.signOut();
	}

}
