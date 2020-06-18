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
  SET_HIDE_POPUP
} from './constants';

// The initial state of the App
export const initialState = {
  error: false,
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
    }
  });

export default appReducer;
