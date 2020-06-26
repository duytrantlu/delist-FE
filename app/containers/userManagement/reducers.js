/* eslint-disable */

import produce from 'immer';
import {
  GET_USERS,
  GET_USERS_SUCCEED,
  GET_USERS_FAILED,
  ADD_USER_SUCCEED,
  ADD_USER_FAILED,
  DEL_USER_SUCCEED,
  DEL_USER_FAILED,
  EDIT_USER_ACTION,
  EDIT_USER_SUCCEED,
  EDIT_USER_FAILED
} from './constants';

export const initialState = {
  users: [],
  skipPageReset: false,
  addUserSucceed: false,
  deleteSucceed: false,
  editUserSucceed: false,
  msgErrors: [],
  loading: false,
};

export const getErrorMessage = err => {
  const errors = [];
  if (err && err.message) {
    errors.push(err.message); // Summary
    const errObj = err.errors ? err.errors : {};
    Object.keys(errObj).forEach(key => {
      errors.push(errObj[key]);
    });
  } else {
    errors.push(`${err.status} ${err.statusText}`);
  }
  return errors;
};

const userManagementContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS:
        draft.loading = true;
        break;
      case GET_USERS_SUCCEED:
        draft.loading = false;
        draft.users = action.data;
        draft.addUserSucceed = false;
        draft.deleteSucceed = false;
        draft.editUserSucceed = false;
        break;
      case GET_USERS_FAILED:
        draft.loading = false;
        draft.users = [];
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case DEL_USER_SUCCEED:
        draft.deleteSucceed = true;
        // draft.msgErrors = [];
        break;
      case DEL_USER_FAILED:
        draft.deleteSucceed = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case ADD_USER_SUCCEED:
        draft.addUserSucceed = true;
        // draft.msgErrors = [];
        break;
      case ADD_USER_FAILED:
        draft.addUserSucceed = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case EDIT_USER_ACTION:
        draft.editUserSucceed = true;
        // draft.msgErrors = [];
        break;
        case EDIT_USER_SUCCEED:
        draft.editUserSucceed = false;
        // draft.msgErrors = [];
        break;
      case EDIT_USER_FAILED:
        draft.editUserSucceed = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
    }
  });
export default userManagementContainerReducer;
