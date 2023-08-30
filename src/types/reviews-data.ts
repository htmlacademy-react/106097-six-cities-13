import { RequestStatusType } from './consts';
import { Reviews } from './review';

export type ReviewsData = {
  reviews: Reviews;
  reviewsSendingStatus: RequestStatusType;
};
