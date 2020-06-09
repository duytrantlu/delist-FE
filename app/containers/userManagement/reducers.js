/* eslint-disable */

import produce from 'immer';
import {
  GET_USERS_SUCCEED,
  GET_USERS_FAILED,
  ADD_USER_SUCCEED,
  DEL_USER_SUCCEED,
  EDIT_USER_SUCCEED
} from './constants';

export const initialState = {
  users: [],
  skipPageReset: false,
  addUserSucceed: false,
  deleteSucceed: false,
  editUserSucceed: false,
};

const userManagementContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_USERS_SUCCEED:
        draft.users = action.data;
        draft.addUserSucceed= false;
        draft.deleteSucceed = false;
        draft.editUserSucceed = false;
        break;
      case GET_USERS_FAILED:
        draft.users = [];
        break;
      case DEL_USER_SUCCEED:
        draft.deleteSucceed = true;
        break;
      case ADD_USER_SUCCEED:
        draft.addUserSucceed= true;
        break;
      case EDIT_USER_SUCCEED:
        draft.editUserSucceed= true;
        break;
    }
  });
export default userManagementContainerReducer;
