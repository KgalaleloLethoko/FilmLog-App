namespace FilmLogBackEnd.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public string Surname { get; set; } = string.Empty;

        public int Age { get; set; }

        public string PasswordHash { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public ICollection<MoviesOnWatchlist>? WatchlistMovies { get; set; }

        public ICollection<WatchedMovie>? WatchedMovies { get; set; }
    }
}
