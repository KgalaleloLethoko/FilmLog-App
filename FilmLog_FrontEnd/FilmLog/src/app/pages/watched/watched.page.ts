import { Component, OnInit } from '@angular/core';
import { WatchedService } from 'src/app/services/watched';

@Component({
  selector: 'app-watched',
  templateUrl: './watched.page.html',
  styleUrls: ['./watched.page.scss'],
  standalone: false
})
export class WatchedPage implements OnInit {

  watchedMovies: any[] = [];
  message: string = '';

  constructor(private watchedService: WatchedService) { }

  ngOnInit(): void {
    this.loadWatchedMovies();
  }

  ionViewWillEnter(): void {
    this.loadWatchedMovies();
  }

  loadWatchedMovies(): void {
    this.watchedService.getWatchedMovies().subscribe({
      next: (response) => {
        this.watchedMovies = response;
      },
      error: () => {
        this.message = 'Failed to load watched movies.';
      }
    });
  }

  removeMovie(id: number): void {
    this.watchedService.deleteWatchedMovie(id).subscribe({
      next: () => {
        this.message = 'Movie removed successfully.';
        this.loadWatchedMovies();
      },
      error: () => {
        this.message = 'Could not remove movie.';
      }
    });
  }

  resetTimesWatched(id: number): void {
    this.watchedService.resetTimesWatched(id).subscribe({
      next: () => {
        this.message = 'Times watched reset successfully.';
        this.loadWatchedMovies();
      },
      error: () => {
        this.message = 'Could not reset times watched.';
      }
    });
  }
}