import {
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCEED,
  GET_DASHBOARD_FAILED,
  DASHBOARD_SET_RANGE_TIME
} from './constants';

export const getDashboard = filter => ({
  type: GET_DASHBOARD,
  filter
});

export const getDashboardSucceed = homeInfo => ({
  type: GET_DASHBOARD_SUCCEED,
  homeInfo
});

export const getDashboardFailed = err => ({
  type: GET_DASHBOARD_FAILED,
  err
});

export const setStateTimeRange = time => ({
  type: DASHBOARD_SET_RANGE_TIME,
  time
});