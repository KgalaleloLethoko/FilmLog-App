import { Component } from '@angular/core';
import { MovieApiService } from 'src/app/services/movie-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: false
})
export class SearchPage {

  searchTitle: string = '';
  movies: any[] = [];
  message: string = '';

  constructor(
    private movieApiService: MovieApiService,
    private router: Router
  ) { }

  searchMovies(): void {
    if (!this.searchTitle.trim()) {
      this.message = 'Please enter a movie title.';
      return;
    }

    this.movieApiService.searchMovies(this.searchTitle).subscribe({
      next: (response) => {
        if (response.response === 'False' || response.Response === 'False') {
          this.movies = [];
          this.message = response.error || response.Error || 'No movies found.';
        } else {
          this.movies = response.search || response.Search || [];
          this.message = '';
        }
      },
      error: () => {
        this.message = 'Movie search failed.';
      }
    });
  }

  openMovieDetails(movie: any): void {
  console.log('Clicked movie:', movie);

  this.router.navigate(['/moviedetails'], {
    queryParams: { title: movie.Title }
  });
}
}


