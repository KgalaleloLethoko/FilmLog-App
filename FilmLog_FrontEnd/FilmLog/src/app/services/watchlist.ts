import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {

  private apiUrl = 'https://localhost:7223/api/watchlist';

  constructor(private http: HttpClient) { }

  getWatchlist(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addToWatchlist(movie: any): Observable<any> {
    return this.http.post(this.apiUrl, movie);
  }

 removeFromWatchlist(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`, {
    responseType: 'text'
  });
  
}
}