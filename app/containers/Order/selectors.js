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

export { 
  makeSelectLoading,
  makeSelectSyncStatus
 };
