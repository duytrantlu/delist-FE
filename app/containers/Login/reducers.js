/* eslint-disable */

import produce from 'immer';
import { flattenDeep } from 'lodash';
import { get } from 'lodash/fp';
import ModelValidations from 'utils/model-validation';
import {
  CHANGE_USER_NAME,
  CHANGE_PASSWORD,
  LOGIN_ACTION,
  LOGIN_FAILED,
  SET_VALIDATION_FORM,
  SET_MSG_MESSAGES,
  LOGIN_SUCCEED,
} from './constants';

export const initialState = {
  messageErrorLogin: [],
  loginLoading: false,
  afterSuccess: false,
  username: '',
  password: '',
  showUserLockedDialog: false,
  wrongUserErrorVisible: false,
  pageLoaded: false,
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

const loginContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USER_NAME:
        draft.username = action.userName;
        break;
      case CHANGE_PASSWORD:
        draft.password = action.password;
        break;
      case LOGIN_ACTION:
        draft.loginLoading = true;
        draft.afterSuccess = false;
        break;
      case LOGIN_FAILED: {
        draft.loginLoading = false;
        draft.afterSuccess = false;
        draft.messageErrorLogin = getErrorMessage(action.err);
        break;
      }
      case LOGIN_SUCCEED: {
        draft.loginLoading = false;
        draft.afterSuccess = true;
        draft.messageErrorLogin = [];
        break;
      }
      case SET_VALIDATION_FORM: {
        draft.validation.formValid = action.status;
        break;
      }
      case SET_MSG_MESSAGES: {
        draft.messageErrorLogin = [];
        break;
      }
      default:
        draft.afterSuccess = false;
        break;
    }
  });
export default loginContainerReducer;
