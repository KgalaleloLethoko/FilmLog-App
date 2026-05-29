using FilmLogBackEnd.FilmLogServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;



namespace FilmLogBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieService _movieService;

        public MoviesController(MovieService movieService)
        {
            _movieService = movieService;
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string t)
        {
            if (string.IsNullOrWhiteSpace(t))
            {
                return BadRequest("Movie title is required.");
            }

            var result = await _movieService.SearchMoviesByTitle(t);

            return Ok(result);
        }

        [HttpGet("details")]
        public async Task<IActionResult> GetMovieDetails([FromQuery] string t)
        {
            if (string.IsNullOrWhiteSpace(t))
            {
                return BadRequest("Movie title is required.");
            }

            var result = await _movieService.GetMovieDetailsByTitle(t);

            return Ok(result);
        }
    }
}