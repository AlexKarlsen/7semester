export class Workout {
    workoutId : string;
    workoutName: string;
    exercises : [Exercise];
}

export class Exercise {
    exerciseName : string;
    exerciseDescription : string;
    exerciseSets : string;
    exerciseReps : string;
}
