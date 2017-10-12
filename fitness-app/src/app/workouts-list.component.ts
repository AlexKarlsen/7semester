import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout } from './workout';

interface itemsResponse {
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
        //this.http.get<itemsResponse>('https://peaceful-temple-74079.herokuapp.com/api/workouts',{observe: 'response'}).subscribe(data => {
        this.http.get<itemsResponse>('http://localhost:3000/api/workouts',{observe: 'response'}).subscribe(data => {
                
        // Still not possible to do: 
        //this.results = data.result;
        // Even if {observe : 'response is removed'}

        this.results = data.body;
        console.log(this.results);
        });
    }

    selectedWorkout: Workout;
    
     onSelect(workout: Workout): void {
       this.selectedWorkout = workout;
     }
}
