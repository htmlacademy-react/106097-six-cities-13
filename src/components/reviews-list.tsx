import { Reviews } from '../types/review';
import { Review } from './review';

type ReviewsListProps = {
  reviews: Reviews;
}

export function ReviewsList({reviews}: ReviewsListProps) {
  return (
    <ul className="reviews__list">
      {reviews.map((review) => (
        <Review
          key={review.id}
          rating={review.rating}
          comment={review.comment}
          date={review.date}
          user={review.user}
        />
      ))}
    </ul>
  );
}
