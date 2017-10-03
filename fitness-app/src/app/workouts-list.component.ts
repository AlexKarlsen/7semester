import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class Workout {
    name: string;
    exercises : [Exercise];
}

export class Exercise {
    name : string;
    description : string;
    sets : string;
    reps : string;
}

interface itemResponse {
    results : [Workout];
}

@Component({
    selector: 'workouts-list',
    template: `
    <ul class="workouts">
        <li *ngFor="let workout of results">
            <span class="badge"> {{workout.name}} </span> 
        </li>
    </ul>
    `
})

export class WorkoutsListComponent implements OnInit {
    results;
    workout : Workout = {
        name: 'test',
        exercises: [{ name: 'test', description: 'test', sets: 'test', reps : 'test'}]
    };
    workouts : [Workout] = [{
        name: 'test',
        exercises: [{ name: 'test', description: 'test', sets: 'test', reps : 'test'}]
    }]

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
        console.log(data['results']);
        console.log(this.results);
        
        });
    }
}
