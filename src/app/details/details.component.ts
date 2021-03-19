import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Movie } from '../_models/movie.model';
import { Observable, Subscription } from 'rxjs';
import { MovieService } from '../_services/movie.service';
import { MovieCredits } from '../_models/movie-credits.model';
import { MovieReviews } from '../_models/movie-reviews.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  id!: number;
  poster!: string;
  release_year: any;
  genres_string!: string;
  user_score!: number;
  movie!: Observable<Movie>;
  movieCredits!: Observable<MovieCredits>;
  movieReviews!: Observable<MovieReviews>;
  parametersObservable!: Subscription;

  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit(): void {
    this.parametersObservable = this.route.params.subscribe({
      next: (result: any) => {
        this.id = result.id;
        this.movie = this.movieService.getMovie(this.id);
        this.movieCredits = this.movieService.getMovieCredits(this.id);
        this.movieReviews = this.movieService.getMovieReviews(this.id);

        this.movie.subscribe({
          next: (movie: Movie) => {
            let genres: string = '';

            if (movie.poster_path !== null) {
              this.poster = environment.poster + movie.poster_path;
            } else {
              this.poster = '';
            }

            this.release_year = movie.release_date?.substring(0, 4);
            movie.genres?.forEach(function(genre) {
              genres += genre.name + ' ';
            });

            this.user_score = movie.vote_average? movie.vote_average * 10 : 0;
            this.genres_string = genres;
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          }
        });

        this.movieCredits.subscribe({
          next: (movieCredits: MovieCredits) => {
          },
          error: (err: any) => {
            console.log(err);
          },
          complete: () => {
            console.log('complete');
          }
        });

        this.movieReviews.subscribe({
          next: (movieReviews: MovieReviews) => {
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
}
