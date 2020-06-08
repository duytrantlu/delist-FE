/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectRegister = state => state.register || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectRegister,
    substate => substate.registerData.username,
  );

const makeSelectPassword = () =>
  createSelector(
    selectRegister,
    substate => substate.registerData.password,
  );

const makeSelectConfirmPassword = () =>
  createSelector(
    selectRegister,
    substate => substate.registerData.repassword,
  );

const getMessageErrorRegister = () =>
  createSelector(
    selectRegister,
    subtitle => subtitle.messageErrorRegister,
  );

const makeSelectValidation = () =>
  createSelector(
    selectRegister,
    subtitle => subtitle.validation,
  );

const makeSelectRegisterSucceed = () =>
  createSelector(
    selectRegister,
    subtitle => subtitle.registerSuccess,
  );

const makeSelectMsgError = () =>
  createSelector(
    selectRegister,
    subtitle => subtitle.messageErrorRegister,
  );

export {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectConfirmPassword,
  getMessageErrorRegister,
  makeSelectValidation,
  makeSelectRegisterSucceed,
  makeSelectMsgError,
};
