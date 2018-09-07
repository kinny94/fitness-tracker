import { TrainingService } from './../training.service';
import { StopTrainingDialog } from './stop-training-dialog';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

	progress = 0;
	timer: number;

	constructor( private dialog: MatDialog, private trainingService: TrainingService ) { }

	ngOnInit() {
		this.startOrResumeTime();
	}

	startOrResumeTime(){

		const step = this.trainingService.getRunninExercise().duration / 100 * 1000;
		this.timer = setInterval(() => {
			this.progress = this.progress + 1;
			if( this.progress >= 100 ){
				this.trainingService.completeExerise();
				clearInterval( this.timer );
			}
		}, step)
	}

	onStop(){
		clearInterval( this.timer );
		const dialogRef = this.dialog.open( StopTrainingDialog, {
			data: {
				progress: this.progress
			}
		});

		dialogRef.afterClosed().subscribe( result => {
			if( result ){
				this.trainingService.cancelExercise( this.progress )
			}else{
				this.startOrResumeTime();
			}
		});
	}

}
