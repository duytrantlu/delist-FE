/* eslint-disable */

import produce from 'immer';
import ModelValidations from 'utils/model-validation';
import { LOCATION_CHANGE } from 'connected-react-router';
import {
  CHANGE_NEW_PASSWORD,
  CHANGE_CONFIRM_NEW_PASSWORD,
  CHANGE_PASS_ACTION,
  CHANGE_PASS_FAILED,
  CHANGE_PASS_SUCCEED,
  SET_VALIDATION_FORM,
  SET_MSG_MESSAGES,
} from './constants';

export const initialState = {
  messageErrorChangePass: [],
  editData: {
    newpassword: '',
    renewpassword: '',
  },
  startEdit: false,
  changePassSuccess: false,
  loading: false,
  validation: {
    newpassword: {
      valid: false,
      touched: false,
      message: ModelValidations.password.minLength.message,
    },
    renewpassword: {
      valid: false,
      touched: false,
      message: 'Password confirm does not match.',
    },
    formValid: false,
  },
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

const userProfileContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_NEW_PASSWORD:
        draft.editData.newpassword = action.newpassword;
        break;
      case CHANGE_CONFIRM_NEW_PASSWORD:
        draft.editData.renewpassword = action.renewpassword;
        break;
      case SET_VALIDATION_FORM:
        draft.validation.formValid = action.status;
        break;
      case SET_MSG_MESSAGES:
        draft.messageErrorChangePassd = [];
        break;
      case CHANGE_PASS_SUCCEED:
        draft.changePassSuccess = true;
        draft.messageErrorChangePassd = [];
        break;
      case CHANGE_PASS_FAILED:
        draft.changePassSuccess = false;
        draft.messageErrorChangePassd = getErrorMessage(action.err);
        break;
      case CHANGE_PASS_ACTION:
        if (draft.startEdit) {
          draft.startEdit = false;
        } else {
          draft.startEdit = true;
        }
        draft.editData.newpassword = '';
        draft.editData.renewpassword = '';
        // draft.validation = initalValidation;
        break;
      case LOCATION_CHANGE:
        draft.startEdit = false;
        draft.changePassSuccess = false;
        draft.validation.formValid = false;
        break;
      default:
        // draft.validation.formValid = false;
        // draft.changePassSuccess = false;
        break;
    }
  });
export default userProfileContainerReducer;
