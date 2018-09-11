import { AuthService } from './auth/auth.service';
import { Component, ViewChild, OnInit } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'fitness-tracker';

	constructor( private authService: AuthService ){

	}

	onToggle(){

	}

	ngOnInit(){
		this.authService.initAuthListener();
	}
}
