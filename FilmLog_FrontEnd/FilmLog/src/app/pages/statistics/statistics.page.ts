import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { WatchedService } from 'src/app/services/watched';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
  standalone: false
})
export class StatisticsPage implements OnInit {

  watchedMovies: any[] = [];
  topGenres: any[] = [];
  message: string = '';

  constructor(private watchedService: WatchedService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.watchedService.getWatchedMovies().subscribe({
      next: (response) => {
        this.watchedMovies = response;
        this.createGenrePieChart();
        this.createTimesWatchedBarChart();
        this.createTopGenresTable();
      },
      error: () => {
        this.message = 'Failed to load statistics.';
      }
    });
  }

  createGenrePieChart(): void {
    const genreCount: any = {};

    this.watchedMovies.forEach(movie => {
      const genres = movie.genre.split(',');

      genres.forEach((genre: string) => {
        const cleanGenre = genre.trim();
        genreCount[cleanGenre] = (genreCount[cleanGenre] || 0) + 1;
      });
    });

    const topSix = Object.entries(genreCount)
      .sort((a: any, b: any) => b[1] - a[1])
      .slice(0, 6);

    new Chart('genrePieChart', {
      type: 'pie',
      data: {
        labels: topSix.map((g: any) => g[0]),
        datasets: [{
          data: topSix.map((g: any) => g[1])
        }]
      }
    });
  }

  createTimesWatchedBarChart(): void {
    new Chart('timesWatchedBarChart', {
      type: 'bar',
      data: {
        labels: this.watchedMovies.map(movie => movie.title),
        datasets: [{
          label: 'Times Watched',
          data: this.watchedMovies.map(movie => movie.timesWatched)
        }]
      }
    });
  }

  createTopGenresTable(): void {
    const genreCount: any = {};

    this.watchedMovies.forEach(movie => {
      const genres = movie.genre.split(',');

      genres.forEach((genre: string) => {
        const cleanGenre = genre.trim();
        genreCount[cleanGenre] = (genreCount[cleanGenre] || 0) + 1;
      });
    });

    this.topGenres = Object.entries(genreCount)
      .map(([genre, count]) => ({ genre, count }))
      .sort((a: any, b: any) => b.count - a.count)
      .slice(0, 6);
  }
}