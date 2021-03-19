import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../_models/movie.model';
import { DiscoverMovie } from '../_models/discover-movie.model';
import { MovieCredits } from '../_models/movie-credits.model';
import { MovieReviews } from '../_models/movie-reviews.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  getMovie(id: number = environment.defaultMovie): Observable<Movie> {
    return this.httpClient.get<Movie>(`${environment.apiMainUrl}/movie/${id}?${environment.apiKey}`).pipe();
  }

  getMovieCredits(id: number = environment.defaultMovie): Observable<MovieCredits> {
    return this.httpClient.get<MovieCredits>(`${environment.apiMainUrl}/movie/${id}/credits?${environment.apiKey}`).pipe();
  }

  getMovieReviews(id: number = environment.defaultMovie): Observable<MovieReviews> {
    return this.httpClient.get<MovieReviews>(`${environment.apiMainUrl}/movie/${id}/reviews?${environment.apiKey}&language=en-US&page=1`).pipe();
  }

  getDiscoverMovies(page: number = 1): Observable<DiscoverMovie> {
    return this.httpClient.get<DiscoverMovie>(`${environment.apiMainUrl}/discover/movie?${environment.apiKey}&language=en-US&page=${page}&sort_by=release_date.desc`).pipe();
  }
}
