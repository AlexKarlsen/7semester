import { Component } from '@angular/core';
import { Workout }    from './workout';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';

@Component({
    selector: 'workout-form',
    templateUrl: './workout-form.component.html'
})

export class WorkoutFormComponent {
    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient, private auth: AuthenticationService) {}

    model = new Workout();

    submitted = false;

    onSubmit() { this.submitted = true; }

    newWorkout(): void {
        console.log(this.model);
        //this.http.post('https://peaceful-temple-74079.herokuapp.com/api/workouts', this.model).subscribe();
        this.http.post('http://localhost:3000/api/workouts', this.model).subscribe();        
        console.log('post request sent');
    }

    // TODO: Remove this when we're done
    //get diagnostic() { return JSON.stringify(this.model); }
}