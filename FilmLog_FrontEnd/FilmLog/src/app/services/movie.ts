import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private movies: Movie[] = [
    {
      id: '1',
      movieTitle: 'The Night Agent',
      releaseYear: '2026',
      poster: './assets/images/wp12185042-the-night-agent-hd-wallpapers.jpg',
      movieCast: ['Gabriel Basso'],
      noOftimesWatched: 0
    },
    {
      id: '2',
      movieTitle: 'Criminal Code',
      releaseYear: '2025',
      poster: './assets/images/Screenshot (1503).png',
      movieCast: ['Maeve Jinkings', 'Alex Nder', 'Rômulo Braga', 'Thomás Aquino', 'Pedro Caetano', 'Giovanni de Lorenzi', 'Guilherme Silva', 'Erom Cordeiro', 'Letícia Tomazella'],
      noOftimesWatched: 0
    },
    {
      id: '3',
      movieTitle: 'Man on Fire',
      releaseYear: '2026',
      poster: './assets/images/Man On Fire.jpg',
      movieCast: ['Alice Braga'],
      noOftimesWatched: 0
    },
    {
      id: '4',
      movieTitle: 'Beauty in Black',
      releaseYear: '2025',
      poster: './assets/images/Watch this clip from Beauty in Black.jpg',
      movieCast: ['Tyler Perry'],
      noOftimesWatched: 0
    },
    {
      id: '5',
      movieTitle: 'Unchosen',
      releaseYear: '2026',
      poster: './assets/images/Screenshot (1507).png',
      movieCast: [''],
      noOftimesWatched: 0
    },
    {
      id: '6',
      movieTitle: 'High Infedelity',
      releaseYear: '2024',
      poster: './assets/images/Screenshot (1509).png',
      movieCast: ['Ayanda Borotho', 'Buyile Mdladla', 'Nkosana Samane'],
      noOftimesWatched: 0
    }
  ];

  private watchlist: Movie[] = [];
  private watched: Movie[] = [];

  getMovies() {
    return this.movies;
  }

  getMovieById(id: string): Movie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  //add movies to watchlist
  addToWatchlist(movie: Movie) {
    const exists = this.watchlist.find(m => m.id === movie.id);
    if (!exists) {
      this.watchlist.push(movie);
    }
  }

  //allow to mark movie as watched
  //checks if the movie is already in the watched list, If it is, it increases how many times it has been watched.
  // // If not, it adds the movie to the watched list and sets the watch count to 1.
 markAsWatched(movie: Movie) {
  const existing = this.watched.find(m => m.id === movie.id);

  if (existing) {
    existing.noOftimesWatched = (existing.noOftimesWatched || 0) + 1;
  } else {
    movie.noOftimesWatched = 1;
    this.watched.push(movie);
  }
}

  //watch liat
  getWatchlist(): Movie[] {
    return this.watchlist;
  }

  //watched list
  getWatched(): Movie[] {
    return this.watched;
  }
  //remove from list, this is on the watched page
  removeFromWatched(movieId: string) {
  this.watched = this.watched.filter(movie => movie.id !== movieId);
}
}