import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';

interface itemResponse {
    results : [Workout];
}

@Component({
    selector: 'workouts-list',
    templateUrl: './workouts-list.component.html',
    styleUrls: ['./workouts-list.component.css']
})

export class WorkoutsListComponent implements OnInit {
    results;
    /*
    workouts : [Workout] = [{
        name: 'test',
        exercises: [{ name: 'test', description: 'test', sets: 'test', reps : 'test'}]
    }]
    */

    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {}
    
    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get('http://localhost:3000/api/workouts/',{observe: 'response'}).subscribe(data => {
        // Read the result field from the JSON response.
        //this.results = data['results'];
        //console.log(data.headers.get('Access-Conrtol-Allow-Origin'));
        this.results = data.body;
        console.log(data.body);
        //console.log(data['results']);
        //console.log(this.results);
        });
    }

    selectedWorkout: Workout;
    
     onSelect(workout: Workout): void {
       this.selectedWorkout = workout;
     }
}
