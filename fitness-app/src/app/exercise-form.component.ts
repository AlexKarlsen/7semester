import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workout, Exercise } from './workout';


@Component({
    selector: 'exercise-form',
    templateUrl: './exercise-form.component.html'
})

export class ExerciseFormComponent{
    @Input() workout: Workout;
    // Inject HttpClient into your component or service.
    constructor(private http: HttpClient) {}
    
        model = new Exercise();
    
        submitted = false;
    
        onSubmit() { this.submitted = true; }
    
        newExercise(): void {
            console.log(this.model);
            console.log(this.workout._id);
            this.http.post('https://peaceful-temple-74079.herokuapp.com/api/workouts/'+this.workout._id, this.model).subscribe();
            console.log('post request sent');
        }
    
        // TODO: Remove this when we're done
        //get diagnostic() { return JSON.stringify(this.model); }
}