/* eslint-disable */

import { push } from 'connected-react-router';
import { isString } from 'lodash/fp';
import { put } from 'redux-saga/effects';
// import { setGlobalError } from 'containers/App/actions';
import msgError from 'utils/msgError';

export const networkOffline = {
  type: 'NETWORK_OFFLINE',
  message: [msgError.networkOffline1, msgError.networkOffline2],
};
export const temporaryError = {
  type: 'TEMPORARY_ERROR',
  message: [msgError.temporaryError1, msgError.temporaryError2],
};
export const permanentError = {
  type: 'PERMANENT_ERROR',
  message: [msgError.permanentError1, msgError.permanentError2],
};
const checkErrorType = error => {
  if (isString(error.code)) {
    return temporaryError;
  }
  switch (error.code) {
    case -1:
      return networkOffline;
    case 408: // Request Timeout
    case 429: // Too Many Requests
    case 503: // Service Unavailable
    case 504: // Gateway Timeout
      return temporaryError;
    default:
      return permanentError;
  }
};
export function* handleGenericError(error, path) {
  if (error.message === 'Cancel') {
    return;
  }
  // Unauthorized
  if (error.code === 401) {
    yield put(push('/auth/login'));
    return;
  }
  // yield put(setGlobalError(checkErrorType(error)));
  console.log('===error===', error);
  // console.log("===setGlobalError===", checkErrorType(error));
  if (isString(path)) {
    yield put(push(`/${path}`));
  }
}

export default {
  networkOffline,
  temporaryError,
  permanentError,
  handleGenericError,
};
