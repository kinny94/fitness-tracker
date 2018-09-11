import { map }  from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

	exercises: Exercise[];
	exerciseSubscription: Subscription;
	isLoading = true;

	constructor( private trainingService: TrainingService ) { }

	ngOnInit() {
		this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe( exercises => {
				this.exercises = exercises;
				this.isLoading = false;
			});
		this.trainingService.getAvailableExercises();
	}

	onStartTraining( form: NgForm){
		this.trainingService.startExercise( form.value.exercise );
	}

	ngOnDestroy(){
		this.exerciseSubscription.unsubscribe();
	}
}
