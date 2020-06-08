/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import {
  GET_USERS,
  SET_DATA_ADD_USER,
  DEL_USER_ACTION,
  EDIT_USER_ACTION,
} from './constants';
import {
  getUsersSucceed,
  getUsersFailed,
  adminAddUserFailed,
  adminAddUserSucceed,
  adminDelUserSucceed,
  adminDelUserFailed,
} from './actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* editRoleUsersActionHandler(data) {
  console.log('==data=', data);
}

export function* delUserHandler(data) {
  try {
    const response = yield call(service.userSevices.delUsers, data.ids);
    if (response.status === 200 && response.data.success === true) {
      yield put(adminDelUserSucceed());
    } else {
      // yield put(adminAddUserFailed());
      console.log('===response==', response);
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* addUserHandler(data) {
  try {
    const response = yield call(service.register, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(adminAddUserSucceed());
    } else {
      // yield put(adminAddUserFailed());
      console.log('===response==', response);
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* getUsersActionHandler() {
  try {
    const response = yield call(service.userSevices.getUsers);
    if (response.status === 200 && response.data.docs.length > 0) {
      yield put(getUsersSucceed(response.data.docs));
    } else {
      yield put(getUsersFailed(response.data));
    }
  } catch (err) {
    yield call(handleError, err);
  }
}

export function* editRoleUsersActionHandlerWatcher() {
  yield takeLatest(EDIT_USER_ACTION, editRoleUsersActionHandler);
}

export function* getUsersActionHandlerWatcher() {
  yield takeLatest(GET_USERS, getUsersActionHandler);
}

export function* addUserHandlerWatcher() {
  yield takeLatest(SET_DATA_ADD_USER, addUserHandler);
}

export function* delUserHandlerWatcher() {
  yield takeLatest(DEL_USER_ACTION, delUserHandler);
}

export default function* watchSaga() {
  yield all([
    fork(getUsersActionHandlerWatcher),
    fork(addUserHandlerWatcher),
    fork(delUserHandlerWatcher),
    fork(editRoleUsersActionHandlerWatcher),
  ]);
}
