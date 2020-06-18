/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const makeSelectCurrentErrorStatus = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

export {
  makeSelectCurrentErrorStatus
};
