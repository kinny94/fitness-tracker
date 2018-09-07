import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService{

	private runningExercise: Exercise;
	exerciseChanged = new Subject<Exercise>();

	private availableExercises: Exercise[] = [
		{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
		{ id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 10 },
		{ id: 'sit-ups', name: 'Sit Ups', duration: 20, calories: 12 },
		{ id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 15 },
		{ id: 'burpees', name: 'Burpees', duration: 60, calories: 8 }
	];

	getAvailableExercises(){
		return [ ...this.availableExercises ];
	}

	startExercise( selectedExerciseId: string ){
		this.runningExercise  = this.availableExercises.find( ex => ex.id === selectedExerciseId );
		this.exerciseChanged.next({ ...this.runningExercise });
	}
}

