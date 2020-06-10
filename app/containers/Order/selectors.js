/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectRegister = state => state.order || initialState;

const makeSelectLoading = () =>
  createSelector(
    selectRegister,
    substate => substate.loading,
  );

export { makeSelectLoading };
