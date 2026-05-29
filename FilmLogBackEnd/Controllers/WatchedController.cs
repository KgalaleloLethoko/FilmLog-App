using FilmLogBackEnd.DBContext;
using FilmLogBackEnd.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace FilmLogBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WatchedController : ControllerBase
    {
        private readonly FilmLogDbContext _context;

        public WatchedController(FilmLogDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWatchedMovies()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var watchedMovies = await _context.WatchedMovies
                .Where(m => m.UserId == userId)
                .ToListAsync();

            return Ok(watchedMovies);
        }

        [HttpPost]
        public async Task<IActionResult> AddWatchedMovie(WatchedMovie movie)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var existingMovie = await _context.WatchedMovies
                .FirstOrDefaultAsync(m => m.Title == movie.Title && m.UserId == userId);

            if (existingMovie != null)
            {
                existingMovie.TimesWatched += 1;
                await _context.SaveChangesAsync();

                return Ok(existingMovie);
            }

            movie.UserId = userId;

            if (movie.TimesWatched <= 0)
            {
                movie.TimesWatched = 1;
            }

            _context.WatchedMovies.Add(movie);
            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateWatchedMovie(int id, WatchedMovie updatedMovie)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var movie = await _context.WatchedMovies
                .FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);

            if (movie == null)
            {
                return NotFound("Watched movie not found.");
            }

            movie.Title = updatedMovie.Title;
            movie.Year = updatedMovie.Year;
            movie.Poster = updatedMovie.Poster;
            movie.Actors = updatedMovie.Actors;
            movie.Genre = updatedMovie.Genre;
            movie.TimesWatched = updatedMovie.TimesWatched;

            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWatchedMovie(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var movie = await _context.WatchedMovies
                .FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);

            if (movie == null)
            {
                return NotFound("Watched movie not found.");
            }

            _context.WatchedMovies.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok("Watched movie removed successfully.");
        }

        [HttpPost("reset/{id}")]
        public async Task<IActionResult> ResetTimesWatched(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var movie = await _context.WatchedMovies
                .FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);

            if (movie == null)
            {
                return NotFound("Watched movie not found.");
            }

            movie.TimesWatched = 1;

            await _context.SaveChangesAsync();

            return Ok(movie);
        }
    }
}