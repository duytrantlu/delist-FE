import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import register from 'services/registerService';
import { REGISTER_ACTION } from './constants';
import { registerActionSucceed, registerActionFailure } from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* registerActionHandler(data) {
  try {
    const response = yield call(register, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(registerActionSucceed());
    } else {
      yield put(registerActionFailure(response.data));
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* registerActionHandlerWatcher() {
  yield takeLatest(REGISTER_ACTION, registerActionHandler);
}

export default function* watchSaga() {
  yield all([fork(registerActionHandlerWatcher)]);
}
