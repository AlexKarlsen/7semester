using System;

namespace AspFitnessApi.Models
{
    public class Exercise
    {
        public int ExerciseId { get; set; }
        public string ExerciseName { get; set; }
        public string ExerciseDescription { get; set; }
        public string ExerciseSets { get; set; }
        public string ExerciseReps { get; set; }

        public Guid WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}