import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_NEW_PASSWORD,
  CHANGE_PASS_ACTION,
  START_CHANGE_ACTION,
  CHANGE_PASS_FAILED,
  CHANGE_PASS_SUCCEED,
  SET_VALIDATION_FORM,
  SET_MSG_MESSAGES,
} from './constants';

export const startEditPwd = () => ({
  type: CHANGE_PASS_ACTION,
});

export const onChanageNewPasswd = newpassword => ({
  type: CHANGE_NEW_PASSWORD,
  newpassword,
});

export const onChanageConfNewPasswd = renewpassword => ({
  type: CHANGE_CONFIRM_NEW_PASSWORD,
  renewpassword,
});

export const onChanageSetValidation = status => ({
  type: SET_VALIDATION_FORM,
  status,
});

export const resetMsgErrors = () => ({
  type: SET_MSG_MESSAGES,
});

export const changePasswordAction = data => ({
  type: START_CHANGE_ACTION,
  data,
});

export const changePasswordActionSucceed = () => ({
  type: CHANGE_PASS_SUCCEED,
});

export const changePasswordActionFailure = err => ({
  type: CHANGE_PASS_FAILED,
  err,
});
