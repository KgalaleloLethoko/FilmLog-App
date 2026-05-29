import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchedService {

  private apiUrl = 'https://localhost:7223/api/watched';

  constructor(private http: HttpClient) { }

  getWatchedMovies(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addWatchedMovie(movie: any): Observable<any> {
    return this.http.post(this.apiUrl, movie);
  }

  updateWatchedMovie(id: number, movie: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, movie);
  }

  deleteWatchedMovie(id: number): Observable<string> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
}

  resetTimesWatched(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset/${id}`, {});
  }
}