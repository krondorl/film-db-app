import { DiscoverMovieResult } from "./discover-movie-result.model";

export interface DiscoverMovie {
  page?: number,
  results?: DiscoverMovieResult[],
  total_results?: number,
  total_pages?: number,
}
