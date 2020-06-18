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

const makeSelectRemoveStoreSucceed = () =>
  createSelector(
    selectStore,
    substate => substate.removeStoreSucceed,
  );

const makeSelectEditStoreSucceed = () =>
  createSelector(
    selectStore,
    substate => substate.editStoreSucceed,
  );

const makeSelectMsgErrors = () =>
  createSelector(
    selectStore,
    substate => substate.msgErrors,
  );
export {
  makeSelectdataStore,
  makeSelectAddStoreSucceed,
  makeSelectRemoveStoreSucceed,
  makeSelectEditStoreSucceed,
  makeSelectMsgErrors
};
