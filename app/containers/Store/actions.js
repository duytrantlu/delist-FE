/* eslint-disable */

import {
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  ADD_STORE,
  ADD_STORE_SUCCEED,
  ADD_STORE_FAILED,
  REMOVE_STORE,
  REMOVE_STORE_SUCCEED,
  REMOVE_STORE_FAILED,
  EDIT_STORE,
  EDIT_STORE_SUCCEED,
  EDIT_STORE_FAILED
} from './constants';

export const getStore = () => ({
  type: GET_STORE,
});

export const getStoreSucceed = store => ({
  type: GET_STORE_SUCCEED,
  store,
});

export const getStoreFailed = err => ({
  type: GET_STORE_FAILED,
  err,
});

export const setAddStore = data => ({
  type: ADD_STORE,
  data,
});

export const setAddStoreSucceed = () => ({
  type: ADD_STORE_SUCCEED,
});

export const setAddStoreFailed = err => ({
  type: ADD_STORE_FAILED,
  err
});

export const removeStore = ids => ({
  type: REMOVE_STORE,
  ids
});

export const removeStoreSucceed = () => ({
  type: REMOVE_STORE_SUCCEED
});

export const removeStoreFailed = err => ({
  type: REMOVE_STORE_FAILED,
  err
});

export const editStore = newStore => ({
  type: EDIT_STORE,
  newStore
});

export const editStoreSucceed = () => ({
  type: EDIT_STORE_SUCCEED,
});

export const editStoreFailed = err => ({
  type: EDIT_STORE_FAILED,
  err
});

