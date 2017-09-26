import { Component } from '@angular/core';

export class Exercise {
  name: string;
  description: string;
  sets: string;
  reps: string;
}

@Component({
    selector: 'exercise-create',
    template: `
    <h2>Exercise</h2>
    <div><input [(ngModel)]="exercise.name" placeholder="Name"></div>
    <div><input [(ngModel)]="exercise.description" placeholder="Description"></div>
    <div><input [(ngModel)]="exercise.sets" placeholder="Sets"></div>
    <div><input [(ngModel)]="exercise.reps" placeholder="Reps"></div>
    `
})

export class ExerciseCreateComponent{
    exercise: Exercise  = {
        name: 'Plank',
        description: '',
        sets: '2',
        reps: '3'
      };
}