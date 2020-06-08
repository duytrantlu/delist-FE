/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectLogin = state => state.login || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectLogin,
    substate => substate.username,
  );

const makeSelectPassword = () =>
  createSelector(
    selectLogin,
    substate => substate.password,
  );

const getMessageErrorLogin = () =>
  createSelector(
    selectLogin,
    subtitle => subtitle.messageErrorLogin,
  );

const makeSelectValidation = () =>
  createSelector(
    selectLogin,
    subtitle => subtitle.validation,
  );

const makeSelectloginSuccess = () =>
  createSelector(
    selectLogin,
    subtitle => subtitle.afterSuccess,
  );

export {
  selectLogin,
  makeSelectUsername,
  makeSelectPassword,
  getMessageErrorLogin,
  makeSelectValidation,
  makeSelectloginSuccess,
};
