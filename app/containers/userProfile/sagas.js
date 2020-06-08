/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  changePasswordActionSucceed,
  changePasswordActionFailure,
} from './actions';
import { START_CHANGE_ACTION } from './constants';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* editpwdActionHandler(data) {
  try {
    const response = yield call(service.profileUser, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(changePasswordActionSucceed());
    } else {
      yield put(changePasswordActionFailure(response.data));
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* editPwdActionHandlerWatcher() {
  yield takeLatest(START_CHANGE_ACTION, editpwdActionHandler);
}

export default function* watchSaga() {
  yield all([fork(editPwdActionHandlerWatcher)]);
}
