import produce from 'immer';
import { addDays } from 'date-fns';
import {
  GET_DASHBOARD,
  GET_DASHBOARD_SUCCEED,
  GET_DASHBOARD_FAILED,
  DASHBOARD_SET_RANGE_TIME
} from './constants';

export const initialState = {
  msgErrors: [],
  dashBoardInfo: {},
  loading: false,
  getDashboardStatus: false,
  stateTimeRange: [
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]
}

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

const dashboardContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case GET_DASHBOARD:
        draft.loading = true;
        break;
      case GET_DASHBOARD_SUCCEED:
        draft.loading = false;
        draft.dashBoardInfo = action.homeInfo;
        break;
      case GET_DASHBOARD_FAILED:
        draft.loading = false;
        draft.msgErrors = getErrorMessage(action.err);
        break;
      case DASHBOARD_SET_RANGE_TIME:
        draft.stateTimeRange = action.time;
        break;
    }
  });
export default dashboardContainerReducer;