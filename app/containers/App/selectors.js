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

const makeSelectUpdateTrackingErrorStatus = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.errorUpdateTracking,
  );

const makeSelectUpdateTrackingErrorMsg = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.msgErrors,
  );

export {
  makeSelectCurrentErrorStatus,
  makeSelectUpdateTrackingErrorStatus,
  makeSelectUpdateTrackingErrorMsg
};
