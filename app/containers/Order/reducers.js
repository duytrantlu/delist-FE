/* eslint-disable */

import produce from 'immer';
import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED,
  SYCN_DATA_STORE
} from './constants';

export const initialState = {
  loading: false,
  syncStatus: false,
};

const ordertContainerReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case UPLOAD_CSV:
        draft.loading = true;
        break;
      case UPLOAD_CSV_SUCCEED:
        draft.loading = false;
        break;
      case SYCN_DATA_STORE:
        draft.syncStatus = true;
        break;
    }
  });
export default ordertContainerReducer;
