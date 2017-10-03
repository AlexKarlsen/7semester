export class Workout {
    _id : string;
    name: string;
    exercises : [Exercise];
}

export class Exercise {
    exercise : string;
    description : string;
    sets : string;
    reps : string;
}