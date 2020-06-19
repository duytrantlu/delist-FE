import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import login from 'authServices/loginService';
import Auth from 'utils/Auth';
import { LOGIN_ACTION } from './constants';
import { loginActionSucceed, loginActionFailure } from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* loginActionHandler(data) {
  try {
    const username = encodeURIComponent(data.data.userName);
    const password = encodeURIComponent(data.data.password);
    const body = {
      username,
      password,
    };
    const response = yield call(login, body);
    if (response.status === 200 && response.data.success === true) {
      Auth.authenticateUser(response.data.token, response.data.user);
      yield put(loginActionSucceed());
    } else {
      yield put(loginActionFailure(response.data));
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* loginActionHandlerWatcher() {
  yield takeLatest(LOGIN_ACTION, loginActionHandler);
}

export default function* watchSaga() {
  yield all([fork(loginActionHandlerWatcher)]);
}
