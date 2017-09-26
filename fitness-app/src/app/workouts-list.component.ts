import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//export class Workout {
  //  name: string;
    //exercise: [];
  //}

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
    
    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {}
    
    ngOnInit(): void {
        // Make the HTTP request:
        this.http.get('https://peaceful-temple-74079.herokuapp.com/api/workouts').subscribe(data => {
        // Read the result field from the JSON response.
        this.results = data['results'];
        });
    }
}
