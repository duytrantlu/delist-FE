/* eslint-disable */

import produce from 'immer';
import ModelValidations from 'utils/model-validation';
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

export const initialState = {
  messageErrorRegister: [],
  registerData: {
    username: '',
    password: '',
    repassword: '',
  },
  registerSuccess: false,
  loading: false,
  validation: {
    username: {
      valid: false,
      touched: false,
      message: ModelValidations.username.regex.message,
    },
    password: {
      valid: false,
      touched: false,
      message: ModelValidations.password.minLength.message,
    },
    repassword: {
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

const registerContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USER_NAME:
        draft.registerData.username = action.userName;
        break;
      case CHANGE_PASSWORD:
        draft.registerData.password = action.password;
        break;
      case CHANGE_CONFIRM_PASSWORD:
        draft.registerData.repassword = action.repassword;
        break;
      case REGISTER_ACTION:
        draft.loading = true;
        draft.registerSuccess = false;
        break;
      case REGISTER_FAILED: {
        draft.loginLoading = false;
        draft.afterSuccess = false;
        draft.messageErrorRegister = getErrorMessage(action.err);
        break;
      }
      case REGISTER_SUCCEED: {
        draft.loginLoading = false;
        draft.registerSuccess = true;
        draft.messageErrorRegister = [];
        break;
      }
      case SET_VALIDATION_FORM: {
        draft.validation.formValid = action.status;
        break;
      }
      case SET_MSG_MESSAGES: {
        draft.messageErrorRegister = [];
        break;
      }
      default: {
        draft.registerSuccess = false;
        break;
      }
    }
  });
export default registerContainerReducer;
