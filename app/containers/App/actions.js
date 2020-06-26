/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { 
  SET_SHOW_POPUP,
  SET_HIDE_POPUP,
  SET_SHOW_POPUP_ERROR_UPDATE_TRACKING,
  SET_HIDE_POPUP_ERROR_UPDATE_TRACKING
 } from './constants';

export const setShowPopup = () => ({ 
  type: SET_SHOW_POPUP,
});

export const setHidePopup = () => ({ 
  type: SET_HIDE_POPUP,
});

export const popupErrorTracking = err => ({ 
  type: SET_SHOW_POPUP_ERROR_UPDATE_TRACKING,
  err
});

export const hidePopupErrorTracking = () => ({ 
  type: SET_HIDE_POPUP_ERROR_UPDATE_TRACKING,
});
