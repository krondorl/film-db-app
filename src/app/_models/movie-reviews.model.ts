import { ReviewResult } from "./review-result.model";

export interface MovieReviews {
  id?: number,
  page?: number,
  results?: ReviewResult[],
  total_pages?: number,
  total_results?: number,
}
