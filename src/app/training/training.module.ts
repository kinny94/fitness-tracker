import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PastTrainingComponent } from './past-training/past-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { StopTrainingDialog } from './current-training/stop-training-dialog';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { TrainingComponent } from './training.component';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		StopTrainingDialog,
		NewTrainingComponent,
		PastTrainingComponent,
	],
	imports: [
		CommonModule,
		MaterialModule,
		FlexLayoutModule,
		AngularFirestoreModule,
		FormsModule
	],
	exports: [],
	entryComponents: [ StopTrainingDialog ]
})

export class TrainingModule{

}
