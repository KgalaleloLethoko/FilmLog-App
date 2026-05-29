import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  private apiUrl = 'https://localhost:7223/api/movies';

  constructor(private http: HttpClient) { }

  searchMovies(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?t=${title}`);
  }

  getMovieDetails(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/details?t=${title}`);
  }
}