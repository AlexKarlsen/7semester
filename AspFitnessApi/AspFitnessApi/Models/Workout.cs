using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspFitnessApi.Models
{
    public class Workout
    {
        public Guid WorkoutId { get; set; }
        public string WorkoutName { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
