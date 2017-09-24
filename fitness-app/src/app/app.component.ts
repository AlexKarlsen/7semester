import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  template: `
  <h1>{{title}}</h1>
  <h2>Exercise</h2>
  <div><input [(ngModel)]="exercise.name" placeholder="Name"></div>
  <div><input [(ngModel)]="exercise.description" placeholder="Description"></div>
  <div><input [(ngModel)]="exercise.sets" placeholder="Sets"></div>
  <div><input [(ngModel)]="exercise.reps" placeholder="Reps"></div>
  `
})

export class AppComponent {
  title = 'Fitness App';

  exercise: Exercise  = {
    name: 'Plank',
    description: '',
    sets: '2',
    reps: '3'
  };
}
export class Exercise {
  name: string;
  description: string;
  sets: string;
  reps: string;
}

