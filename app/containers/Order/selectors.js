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

const makeSelectSyncDataSucceed = () =>
  createSelector(
    selectOrder,
    substate => substate.syncDataSucceed,
  );

const makeSelectdataStore = () =>
  createSelector(
    selectOrder,
    substate => substate.stores,
  );

const makeSelectStatusGetStore = () =>
  createSelector(
    selectOrder,
    substate => substate.getStoreStatus,
  );

const makeSelectExportCsvStatus = () =>
  createSelector(
    selectOrder,
    substate => substate.exportStatus,
  );

const makeSelectDataExport = () =>
  createSelector(
    selectOrder,
    substate => substate.exportData,
  );

export {
  makeSelectLoading,
  makeSelectSyncStatus,
  makeSelectOrders,
  makeSelectTableLoading,
  makeSelectPages,
  makeSelectTotalItems,
  makeSelectSyncDataSucceed,
  makeSelectdataStore,
  makeSelectStatusGetStore,
  makeSelectExportCsvStatus,
  makeSelectDataExport,
};
