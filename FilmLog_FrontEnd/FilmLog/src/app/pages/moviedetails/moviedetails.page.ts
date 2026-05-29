import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MovieApiService } from 'src/app/services/movie-api';
import { WatchlistService } from 'src/app/services/watchlist';
import { WatchedService } from 'src/app/services/watched';

@Component({
  selector: 'app-moviedetails',
  templateUrl: './moviedetails.page.html',
  styleUrls: ['./moviedetails.page.scss'],
  standalone: false
})
export class MoviedetailsPage implements OnInit {

  movie: any;
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieApiService: MovieApiService,
    private watchlistService: WatchlistService,
    private watchedService: WatchedService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const title = params['title'];

      if (title) {
        this.loadMovieDetails(title);
      }
    });
  }

  loadMovieDetails(title: string): void {
    this.movieApiService.getMovieDetails(title).subscribe({
      next: (response) => {
        this.movie = response;
      },
      error: () => {
        this.message = 'Failed to load movie details.';
      }
    });
  }

  addToWatchlist(): void {
    if (!this.movie) {
      return;
    }

    const watchlistMovie = {
      title: this.movie.Title,
      year: this.movie.Year,
      poster: this.movie.Poster,
      actors: this.movie.Actors,
      genre: this.movie.Genre
    };

    this.watchlistService.addToWatchlist(watchlistMovie).subscribe({
      next: () => {
        this.message = 'Added to watchlist';
      },
      error: () => {
        this.message = 'Could not add to watchlist';
      }
    });
  }

  markAsWatched(): void {
    if (!this.movie) {
      return;
    }

    const watchedMovie = {
      title: this.movie.Title,
      year: this.movie.Year,
      poster: this.movie.Poster,
      actors: this.movie.Actors,
      genre: this.movie.Genre,
      timesWatched: 1
    };

    this.watchedService.addWatchedMovie(watchedMovie).subscribe({
      next: () => {
        this.message = 'Marked as watched';
      },
      error: () => {
        this.message = 'Could not mark as watched';
      }
    });
  }
}