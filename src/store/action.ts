import {createAction} from '@reduxjs/toolkit';

export const Action = {
  CHANGE_CITY: 'changeCity',
};

export const changeCity = createAction<string>(Action.CHANGE_CITY);
