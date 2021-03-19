import { Genre } from "./genre.model";
import { ProductionCompany } from "./production-company.model";
import { ProductionCountry } from "./production-country.model";
import { SpokenLanguage } from "./spoken-language.model";

export interface Movie {
  adult?: boolean,
  backdrop_path?: string | null,
  belongs_to_collection?: object | null,
  budget?: number,
  genres?: Genre[],
  homepage?: string | null,
  id?: number,
  imdb_id?: string | null,
  original_language?: string,
  original_title?: string,
  overview?: string | null,
  popularity?: number,
  poster_path?: string | null,
  production_companies?: ProductionCompany[],
  production_countries?: ProductionCountry[],
  release_date?: string,
  revenue?: number,
  runtime?: number | null,
  spoken_languages?: SpokenLanguage[],
  status?: string,
  tagline?: string | null,
  title?: string,
  video?: boolean,
  vote_average?: number,
  vote_count?: number
}
