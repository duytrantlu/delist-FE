/* eslint-disable */

import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import { handleGenericError } from 'utils/handleGenericError';
import service from 'services';
import register from 'authServices/registerService';
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
  editRoleUserSucceed,
  editRoleUserFailed
} from './actions';
import {
  setShowPopup
} from 'containers/App/actions';

export function* handleError(error) {
  yield call(handleGenericError, error);
}

export function* editRoleUsersActionHandler(data) {
  try {
    const response = yield call(service.userSevices.editRole, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(editRoleUserSucceed());
    } else {
      yield put(editRoleUserFailed(new Error("Edit role User Failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(editRoleUserFailed(err));
    yield put(setShowPopup());
  }
}

export function* delUserHandler(data) {
  try {
    const response = yield call(service.userSevices.delUsers, data.ids);
    if (response.status === 200 && response.data.success === true) {
      yield put(adminDelUserSucceed());
    } else {
      yield put(adminDelUserFailed(new Error("Remove User Failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(adminDelUserFailed(err));
    yield put(setShowPopup());
  }
}

export function* addUserHandler(data) {
  try {
    const response = yield call(register, data.data);
    if (response.status === 200 && response.data.success === true) {
      yield put(adminAddUserSucceed());
    } else {
      yield put(adminAddUserFailed(new Error("Add User Failed.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(adminAddUserFailed(err));
    yield put(setShowPopup());
  }
}

export function* getUsersActionHandler() {
  try {
    const response = yield call(service.userSevices.getUsers);
    if (response.status === 200 && response.data.docs.length > 0) {
      yield put(getUsersSucceed(response.data.docs));
    } else {
      yield put(getUsersFailed(new Error("Some wrong occurred when get Users.")));
      yield put(setShowPopup());
    }
  } catch (err) {
    yield put(getUsersFailed(err));
    yield put(setShowPopup());
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
