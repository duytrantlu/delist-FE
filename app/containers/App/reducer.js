/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  SET_SHOW_POPUP,
  SET_HIDE_POPUP,
  SET_SHOW_POPUP_ERROR_UPDATE_TRACKING,
  SET_HIDE_POPUP_ERROR_UPDATE_TRACKING
} from './constants';

// The initial state of the App
export const initialState = {
  error: false,
  errorUpdateTracking: false,
  msgErrors: [],
};

export const getErrorMessage = arrErr => {
  const errors = [];
  arrErr.forEach(err => {
    if (err.errors && err.errors.message) {
      errors.push(`Order ${err.id} ${err.number} ${err.errors.message}`); // Summary
      // const errObj = err.errors ? err.errors : {};
      // Object.keys(errObj).forEach(key => {
      //   errors.push(errObj[key]);
      // });
    } else {
      errors.push(`${err.status} ${err.statusText}`);
    }
  })
  return errors;
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SET_SHOW_POPUP:
        draft.error = true;
        break;

      case SET_HIDE_POPUP:
        draft.error = false;
        break;

      case SET_SHOW_POPUP_ERROR_UPDATE_TRACKING:
        draft.errorUpdateTracking = true;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case SET_HIDE_POPUP_ERROR_UPDATE_TRACKING:
        draft.errorUpdateTracking = false;
        break;
    }
  });

export default appReducer;
