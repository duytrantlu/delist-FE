/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectRegister = state => state.userManagement || initialState;

const makeSelectUsers = () =>
  createSelector(
    selectRegister,
    substate => substate.users,
  );

const makeSelectAddUserSucceed = () =>
  createSelector(
    selectRegister,
    substate => substate.addUserSucceed,
  );

const makeSelectDelUserSucceed = () =>
  createSelector(
    selectRegister,
    substate => substate.deleteSucceed,
  );

export { makeSelectUsers, makeSelectAddUserSucceed, makeSelectDelUserSucceed };
