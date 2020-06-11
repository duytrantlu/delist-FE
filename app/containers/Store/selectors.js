/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectStore = state => state.storeManager || initialState;

const makeSelectdataStore = () =>
  createSelector(
    selectStore,
    substate => substate.stores,
  );

const makeSelectAddStoreSucceed = () =>
  createSelector(
    selectStore,
    substate => substate.addStoreSucceed,
  );

export { makeSelectdataStore, makeSelectAddStoreSucceed };
