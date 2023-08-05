import { User } from '../types/review';
import { MAX_RATING } from '../const';
import { formatDate } from '../utils';

type ReviewProps = {
  rating: number;
  comment: string;
  date: string;
  user: User;
}

export function Review({rating, comment, date, user}: ReviewProps) {
  const formattedDate = formatDate(date);
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${rating / MAX_RATING * 100}%` }} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment}
        </p>
        <time className="reviews__time" dateTime={date}>
          {formattedDate.month} {formattedDate.year}
        </time>
      </div>
    </li>
  );
}
