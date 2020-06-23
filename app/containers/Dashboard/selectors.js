/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectDashboard = state => state.dashboard || initialState;

const makeSelectTimeSearch = () =>
  createSelector(
    selectDashboard,
    substate => substate.stateTimeRange,
  );

const makeSelectDashboardInfo = () =>
  createSelector(
    selectDashboard,
    substate => substate.dashBoardInfo,
  );

export {
  makeSelectTimeSearch,
  makeSelectDashboardInfo
};
