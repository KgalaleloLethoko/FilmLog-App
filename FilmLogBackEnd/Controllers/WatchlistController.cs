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
    public class WatchlistController : ControllerBase
    {
        private readonly FilmLogDbContext _context;

        public WatchlistController(FilmLogDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetWatchlist()
        {
            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            var watchlistMovies = await _context.WatchlistMovies
                .Where(m => m.UserId == userId)
                .ToListAsync();

            return Ok(watchlistMovies);
        }

        [HttpPost]
        public async Task<IActionResult> AddToWatchlist(MoviesOnWatchlist movie)
        {
            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            movie.UserId = userId;

            _context.WatchlistMovies.Add(movie);

            await _context.SaveChangesAsync();

            return Ok(movie);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> RemoveFromWatchlist(int id)
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var movie = await _context.WatchlistMovies
                .FirstOrDefaultAsync(m => m.Id == id && m.UserId == userId);

            if (movie == null)
            {
                return NotFound("Movie not found in watchlist.");
            }

            _context.WatchlistMovies.Remove(movie);
            await _context.SaveChangesAsync();

            return Ok("Movie removed from watchlist.");
        }
    }
}