import { TrainingModule } from './training/training.module';
import { AuthModule } from './auth/auth.module';

import { environment } from './../environments/environment';
import { TrainingService } from './training/training.service';
import { AuthService } from './auth/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { StoreModule } from '@ngrx/store';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UIService } from './shared/ui.service';
import { reducers } from './app.reducer';

@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		AppRoutingModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp( environment.firebase  ),
		AngularFireAuthModule,
		AuthModule,
		TrainingModule,
		StoreModule.forRoot( reducers )
	],
	providers: [
		AuthService,
		TrainingService,
		UIService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
