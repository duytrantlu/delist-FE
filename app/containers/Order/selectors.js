/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectOrder = state => state.order || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectOrder,
    substate => substate.loading,
  );

const makeSelectSyncStatus = () =>
  createSelector(
    selectOrder,
    substate => substate.syncStatus,
  );

const makeSelectOrders = () =>
  createSelector(
    selectOrder,
    substate => substate.listOrders,
  );

const makeSelectPages = () =>
  createSelector(
    selectOrder,
    substate => substate.pages,
  );

const makeSelectTotalItems = () =>
  createSelector(
    selectOrder,
    substate => substate.totalItems,
  );

const makeSelectTableLoading = () =>
  createSelector(
    selectOrder,
    substate => substate.tableLoading,
  );

export {
  makeSelectLoading,
  makeSelectSyncStatus,
  makeSelectOrders,
  makeSelectTableLoading,
  makeSelectPages,
  makeSelectTotalItems,
};
