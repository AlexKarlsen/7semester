import { Component, Input } from '@angular/core';
import { Workout } from './workout';

@Component({
    selector: 'workout-detail',
    templateUrl: './workout-detail.component.html',
})

export class WorkoutDetailComponent {
    @Input() workout: Workout;
}
