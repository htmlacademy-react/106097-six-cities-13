import { FormEvent, Fragment, useState } from 'react';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { postReview } from '../store/api-actions';
import { selectors } from '../middleware';
import { RequestStatus } from '../const';

const MIN_COMMENTS_LENGTH = 50;
const MAX_COMMENTS_LENGTH = 500;
const MIN_RATING = 1;

const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
};

type CommentFormProps = {
  offerId: string;
}

export function CommentForm({offerId}: CommentFormProps) {
  const [reviewData, setReviewData] = useState({
    rating: MIN_RATING,
    comment: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setReviewData({...reviewData, rating: Number(evt.target.value)});
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewData({...reviewData, comment: evt.target.value});
  };

  const isValid = reviewData.comment.length >= MIN_COMMENTS_LENGTH
  && reviewData.comment.length <= MAX_COMMENTS_LENGTH;

  const dispatch = useAppDispatch();
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (!isValid) {
      return;
    }
    dispatch(postReview({reviewData, offerId}));
  };

  const dataSendingStatus = useAppSelector(selectors.reviewPostStatus);
  let isSubmitButtonDisable = true;
  if (isValid) {
    isSubmitButtonDisable = false;
  }
  if (dataSendingStatus === RequestStatus.Pending) {
    isSubmitButtonDisable = true;
  }
  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title]) => (
            <Fragment key={score}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={score}
                id={`${score}-stars`}
                type="radio"
                checked={reviewData.rating === Number(score)}
                onChange={handleRatingChange}
              />
              <label
                htmlFor={`${score}-stars`}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star" />
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleReviewChange}
        value={reviewData.comment}
        minLength={50}
        maxLength={300}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe
          your stay with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENTS_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitButtonDisable}
        >
          {dataSendingStatus === RequestStatus.Pending ? 'Sending...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
