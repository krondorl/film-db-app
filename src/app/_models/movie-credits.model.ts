import { Cast } from "./cast.model";
import { Crew } from "./crew.model";

export interface MovieCredits {
  id?: number,
  cast?: Cast[],
  crew?: Crew[]
}
