using FilmLogBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace FilmLogBackEnd.DBContext
{
        public class FilmLogDbContext : DbContext
        {
            public FilmLogDbContext(DbContextOptions<FilmLogDbContext> options) : base(options)
            {
            }

            public DbSet<User> Users { get; set; }

            public DbSet<MoviesOnWatchlist> WatchlistMovies { get; set; }

            public DbSet<WatchedMovie> WatchedMovies { get; set; }
        }
    }

