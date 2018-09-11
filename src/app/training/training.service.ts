import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService{

	exerciseChanged = new Subject<Exercise>();
	exercisesChanged = new Subject<Exercise[]>();
	private runningExercise: Exercise;
	private exercises: Exercise[] = [];
	private availableExercises: Exercise[] = [];

	constructor( private db: AngularFirestore ){}

	getAvailableExercises(){
		this.db
		.collection('availableExercises')
		.snapshotChanges()
		.pipe(
			map( docArray => {
				return  docArray.map( doc => {
					return {
						id: doc.payload.doc.id,
						name: doc.payload.doc.data()["name"],
						duration: doc.payload.doc.data()["duration"],
						calories: doc.payload.doc.data()["calories"]
					}
				})
			})
		).subscribe((exercises: Exercise[]) => {
			this.availableExercises = exercises;
			this.exercisesChanged.next([ ...this.availableExercises ]);
		});
	}

	startExercise( selectedExerciseId: string ){
		this.runningExercise  = this.availableExercises.find( ex => ex.id === selectedExerciseId );
		this.exerciseChanged.next({ ...this.runningExercise });
	}


	completeExerise(){
		this.exercises.push({
			...this.runningExercise,
			date: new Date(),
			state: 'completed'
		});
		this.runningExercise = null;
		this.exerciseChanged.next( null );
	}

	cancelExercise( progress: number ){
		this.exercises.push({
			...this.runningExercise,
			duration: this.runningExercise.duration * ( progress / 100 ),
			calories: this.runningExercise.calories * ( progress / 100 ),
			date: new Date(),
			state: 'cancelled'
		});
		this.runningExercise = null;
		this.exerciseChanged.next( null );
	}

	getRunninExercise(){
		return { ...this.runningExercise };
	}

	getCompletedOrCanceledExercises(){
		return this.exercises.slice();
	}
}

