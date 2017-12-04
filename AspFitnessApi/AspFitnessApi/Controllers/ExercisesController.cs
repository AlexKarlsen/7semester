using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AspFitnessApi.Models;
using Microsoft.AspNetCore.Authorization;

namespace AspFitnessApi.Controllers
{
    [Produces("application/json")]
    [Route("api/workouts/{workoutId}/Exercises")]
    public class ExercisesController : Controller
    {
        // Not sure about the structure of passing the workout id with the route - might not be needed. As the table exercise has it's own primary key.
        // If we wish to have an RESTful architecture, it must be passed on, but we do not need it to look it up in the database.
        // However if not having a where clause on workout id you might be able to get an exercise not owned by the workout
        // It need to be passed when creating a new exercise. 
        // The exercise can live without a workout right now. 
        private readonly AspFitnessApiContext _context;

        public ExercisesController(AspFitnessApiContext context)
        {
            _context = context;
        }

        //// GET: api/Exercises
        //[HttpGet]
        //public List<Exercise> GetExercise([FromRoute] Guid workoutId)
        //{
        //    List<Exercise> exerciseList = _context.Exercise.Where(e => e.WorkoutId == workoutId).ToList();
        //    return exerciseList;
        //}

        //// GET: api/Exercises/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetExercise([FromRoute] Guid workoutId, [FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var exercise = await _context.Exercise.Where(m => m.WorkoutId == workoutId).SingleOrDefaultAsync(m => m.ExerciseId == id);

        //    if (exercise == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(exercise);
        //}

        // PUT: api/Exercises/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutExercise([FromRoute] Guid workoutId, [FromRoute] int id, [FromBody] Exercise exercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != exercise.ExerciseId)
            {
                return BadRequest();
            }

            exercise.WorkoutId = workoutId;

            _context.Entry(exercise).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExerciseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize]
        // POST: api/Exercises
        [HttpPost]
        public async Task<IActionResult> PostExercise([FromRoute] Guid workoutId, [FromBody] Exercise exercise)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            // Create the relationship
            exercise.WorkoutId = workoutId;

            _context.Exercise.Add(exercise);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkout", "Workouts", new { id = exercise.ExerciseId }, exercise);
        }

        // DELETE: api/Exercises/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExercise([FromRoute] Guid workoutId, [FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var exercise = await _context.Exercise.SingleOrDefaultAsync(m => m.ExerciseId == id);
            if(exercise.WorkoutId != workoutId)
            {
                return BadRequest();
            }

            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercise.Remove(exercise);
            await _context.SaveChangesAsync();

            return Ok(exercise);
        }

        private bool ExerciseExists(int id)
        {
            return _context.Exercise.Any(e => e.ExerciseId == id);
        }
    }
}
