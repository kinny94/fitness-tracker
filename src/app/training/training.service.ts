import { map } from 'rxjs/operators';
import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class TrainingService{

	exerciseChanged = new Subject<Exercise>();
	exercisesChanged = new Subject<Exercise[]>();
	finishedExercisesChanged = new Subject<Exercise[]>();

	private runningExercise: Exercise;
	private finishedExercises: Exercise[] = [];
	private availableExercises: Exercise[] = [];
	private fbSubs: Subscription[] = [];

	constructor( private db: AngularFirestore ){}

	getAvailableExercises(){
		this.fbSubs.push( this.db
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
		})) ;
	}

	startExercise( selectedExerciseId: string ){
		//this.db.doc('availableExercises/' + selectedExerciseId ).update({ lastSelected: new Date() });
		this.runningExercise  = this.availableExercises.find( ex => ex.id === selectedExerciseId );
		this.exerciseChanged.next({ ...this.runningExercise });
	}


	completeExerise(){
		this.addDataToDatabase({
			...this.runningExercise,
			date: new Date(),
			state: 'completed'
		});
		this.runningExercise = null;
		this.exerciseChanged.next( null );
	}

	cancelExercise( progress: number ){
		this.addDataToDatabase({
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
		this.fbSubs.push(this.db.collection('finishedExercises')
		.valueChanges()
		.subscribe(( exercises: Exercise[] ) => {
			this.finishedExercises = exercises;
			this.finishedExercisesChanged.next( exercises );
		}));
	}

	cancelSubscription(){
		this.fbSubs.forEach( sub => sub.unsubscribe());
	}

	private addDataToDatabase( exercise: Exercise ){
		this.db.collection( 'finishedExercises' ).add( exercise );
	}
}

