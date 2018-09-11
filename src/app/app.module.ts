import { AuthModule } from './auth/auth.module';
import { environment } from './../environments/environment';
import { TrainingService } from './training/training.service';
import { AuthService } from './auth/auth.service';
import { StopTrainingDialog } from './training/current-training/stop-training-dialog';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';

import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingComponent } from './training/past-training/past-training.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { UIService } from './shared/ui.service';

@NgModule({
	declarations: [
		AppComponent,
		TrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent,
		StopTrainingDialog
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
		AngularFirestoreModule,
		AngularFireAuthModule,
		AuthModule
	],
	providers: [
		AuthService,
		TrainingService,
		UIService
	],
	bootstrap: [AppComponent],
	entryComponents: [ StopTrainingDialog ]
})
export class AppModule { }
