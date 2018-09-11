import { Subject } from 'rxjs/Subject';

import { AuthData } from './auth-data.model';
import { User } from './user.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';

@Injectable()
export class AuthService{

	authChange = new Subject<boolean>();
	private isAuthenticated = false;

	constructor( private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService  ){}

	registerUser( authData: AuthData ){
		this.afAuth.auth.createUserWithEmailAndPassword( authData.email, authData.password )
		.then( result => {
		})
		.catch( err => console.log( err ));
	}

	login( authData: AuthData ){
		this.afAuth.auth.signInWithEmailAndPassword( authData.email, authData.password )
		.then(( result ) => {

		})
		.catch( err => console.log( err ));
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
