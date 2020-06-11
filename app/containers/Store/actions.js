/* eslint-disable */

import {
  GET_STORE,
  GET_STORE_SUCCEED,
  GET_STORE_FAILED,
  ADD_STORE,
  ADD_STORE_SUCCEED,
  ADD_STORE_FAILED,
} from './constants';

export const getStore = () => ({
  type: GET_STORE,
});

export const getStoreSucceed = store => ({
  type: GET_STORE_SUCCEED,
  store,
});

export const setAddStore = data => ({
  type: ADD_STORE,
  data,
});

export const setAddStoreSucceed = () => ({
  type: ADD_STORE_SUCCEED,
});
