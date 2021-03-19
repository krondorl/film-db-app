import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscoverMovie } from '../_models/discover-movie.model';
import { DiscoverMovieResult } from '../_models/discover-movie-result.model';
import { MovieService } from '../_services/movie.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  discoverMovie!: Observable<DiscoverMovie>;
  parametersObservable!: Subscription;
  page: number = 1;
  movies: DiscoverMovieResult[] = [];

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.parametersObservable = this.route.params.subscribe({
      next: (result: any) => {
        this.discoverMovie = this.movieService.getDiscoverMovies(this.page);
        this.discoverMovie.subscribe({
          next: (discoverMovie: DiscoverMovie) => {
            this.loadMovies(discoverMovie);
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete');
      }
    });
  }

  loadMovies(discoverMovie: DiscoverMovie): void {
    this.movies = discoverMovie.results || [];
    this.movies.forEach((movie: DiscoverMovieResult, index: any) => {
      this.movies[index].poster_path = environment.poster + this.movies[index].poster_path;
    }, this.movies);
  }

  previous(): void {
    if (this.page > 1) {
      this.page -= 1;
    }

    this.discoverMovie = this.movieService.getDiscoverMovies(this.page);
    this.discoverMovie.subscribe({
      next: (discoverMovie: DiscoverMovie) => {
        this.loadMovies(discoverMovie);
      }
    });
  }

  next(): void {
    this.page += 1;
    this.discoverMovie = this.movieService.getDiscoverMovies(this.page);
    this.discoverMovie.subscribe({
      next: (discoverMovie: DiscoverMovie) => {
        this.loadMovies(discoverMovie);
      }
    });
  }
}
