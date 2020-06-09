import {
  GET_USERS,
  GET_USERS_SUCCEED,
  GET_USERS_FAILED,
  SET_DATA_ADD_USER,
  ADD_USER_SUCCEED,
  ADD_USER_FAILED,
  DEL_USER_ACTION,
  DEL_USER_SUCCEED,
  DEL_USER_FAILED,
  EDIT_USER_ACTION,
} from './constants';

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSucceed = data => ({
  type: GET_USERS_SUCCEED,
  data,
});

export const getUsersFailed = err => ({
  type: GET_USERS_FAILED,
  err,
});

export const setDataAddUser = data => ({
  type: SET_DATA_ADD_USER,
  data,
});

export const adminAddUserSucceed = () => ({
  type: ADD_USER_SUCCEED,
});

export const adminAddUserFailed = () => ({
  type: ADD_USER_FAILED,
});

export const adminDelUserAction = data => ({
  type: DEL_USER_ACTION,
  ids: data,
});

export const adminDelUserSucceed = () => ({
  type: DEL_USER_SUCCEED,
});

export const adminDelUserFailed = () => ({
  type: DEL_USER_FAILED,
});

export const editRoleUser = newRole => ({
  type: EDIT_USER_ACTION,
  role: newRole,
});
