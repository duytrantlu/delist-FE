/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducers';

const selectUserProfile = state => state.userProfile || initialState;

const makeSelectStartEdit = () =>
  createSelector(
    selectUserProfile,
    substate => substate.startEdit,
  );

const makeSelectValidation = () =>
  createSelector(
    selectUserProfile,
    substate => substate.validation,
  );

const makeSelectNewpwd = () =>
  createSelector(
    selectUserProfile,
    substate => substate.editData.newpassword,
  );

const makeSelectConfNewpwd = () =>
  createSelector(
    selectUserProfile,
    substate => substate.editData.renewpassword,
  );

const makeSelectChangeSucceed = () =>
  createSelector(
    selectUserProfile,
    substate => substate.changePassSuccess,
  );

const makeSelectMsgError = () =>
  createSelector(
    selectUserProfile,
    substate => substate.messageErrorChangePassd,
  );
export {
  makeSelectStartEdit,
  makeSelectValidation,
  makeSelectNewpwd,
  makeSelectConfNewpwd,
  makeSelectChangeSucceed,
  makeSelectMsgError,
};
