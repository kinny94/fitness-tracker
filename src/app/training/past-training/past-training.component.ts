import { Exercise } from './../exercise.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { TrainingService } from '../training.service';

@Component({
	selector: 'app-past-training',
	templateUrl: './past-training.component.html',
	styleUrls: ['./past-training.component.css']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

	displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
	dataSource = new MatTableDataSource<Exercise>();

	@ViewChild(MatSort) sort: MatSort;

	constructor( private trainingService: TrainingService) { }

	ngOnInit() {
		this.dataSource.data = this.trainingService.getCompletedOrCanceledExercises();
	}

	ngAfterViewInit(){
		this.dataSource.sort = this.sort;
	}

}
