import {
  CHANGE_USER_NAME,
  CHANGE_PASSWORD,
  LOGIN_ACTION,
  LOGIN_FAILED,
  SET_VALIDATION_FORM,
  SET_MSG_MESSAGES,
  LOGIN_SUCCEED,
} from './constants';

export const changeUserName = userName => ({
  type: CHANGE_USER_NAME,
  userName,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});
export const loginAction = data => ({
  type: LOGIN_ACTION,
  data,
});

export const loginActionFailure = err => ({
  type: LOGIN_FAILED,
  err,
});

export const loginActionSucceed = () => ({
  type: LOGIN_SUCCEED,
});

export const loginSetValidation = status => ({
  type: SET_VALIDATION_FORM,
  status,
});

export const resetMsgErrors = () => ({
  type: SET_MSG_MESSAGES,
});
