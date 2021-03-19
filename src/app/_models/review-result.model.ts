import { AuthorDetails } from "./author-details.model";

export interface ReviewResult {
  author?: string,
  author_details: AuthorDetails,
  content?: string,
  created_at?: string,
  id?: string,
  updated_at?: string,
  url?: string
}
