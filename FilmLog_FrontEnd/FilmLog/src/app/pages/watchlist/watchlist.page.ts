import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/services/watchlist';
import { Router } from '@angular/router';
import { WatchedService } from 'src/app/services/watched';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.page.html',
  styleUrls: ['./watchlist.page.scss'],
  standalone: false
})
export class WatchlistPage implements OnInit {

  watchlistMovies: any[] = [];
  message: string = '';

  constructor(private watchlistService: WatchlistService, private watchedService: WatchedService, private router: Router) { }

  ngOnInit(): void {
    this.loadWatchlist();
  }

  ionViewWillEnter(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    this.watchlistService.getWatchlist().subscribe({
      next: (response) => {
       this.watchlistMovies = response;
       this.message = '';
      },
      error: () => {
        this.message = 'Failed to load watchlist.';
      }
    });
  }

  removeFromWatchlist(id: number): void {
    this.watchlistService.removeFromWatchlist(id).subscribe({
      next: () => {
        this.message = 'Removed from watchlist.';
        this.loadWatchlist();
      },
      error: () => {
        this.message = 'Could not remove movie.';
      }
    });
  }

    openMovieDetails(movie: any): void {
  this.router.navigate(['/moviedetails'], {
    queryParams: { title: movie.title }
  });
}

moveToWatched(movie: any): void {

  const watchedMovie = {
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
    actors: movie.actors,
    genre: movie.genre,
    timesWatched: 1
  };

  this.watchedService.addWatchedMovie(watchedMovie).subscribe({
    next: () => {

      this.watchlistService.removeFromWatchlist(movie.id).subscribe({
        next: () => {
          this.message = 'Movie moved to watched.';
          this.loadWatchlist();
        }
      });

    },
    error: () => {
      this.message = 'Could not move movie.';
    }
  });
}
}

