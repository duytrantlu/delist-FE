import {
  CHANGE_USER_NAME,
  CHANGE_PASSWORD,
  REGISTER_ACTION,
  REGISTER_FAILED,
  REGISTER_SUCCEED,
  CHANGE_CONFIRM_PASSWORD,
  SET_VALIDATION_FORM,
  SET_MSG_MESSAGES,
} from './constants';

export const changeUserName = userName => ({
  type: CHANGE_USER_NAME,
  userName,
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password,
});
export const changeConfirmPassword = repassword => ({
  type: CHANGE_CONFIRM_PASSWORD,
  repassword,
});
export const registerAction = data => ({
  type: REGISTER_ACTION,
  data,
});

export const registerActionFailure = err => ({
  type: REGISTER_FAILED,
  err,
});

export const registerActionSucceed = () => ({
  type: REGISTER_SUCCEED,
});

export const registerSetValidation = status => ({
  type: SET_VALIDATION_FORM,
  status,
});

export const resetMsgErrors = () => ({
  type: SET_MSG_MESSAGES,
});
