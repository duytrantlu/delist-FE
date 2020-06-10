/* eslint-disable */

import produce from 'immer';
import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED
} from './constants';

export const initialState = {
  loading: false,
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
    }
  });
export default ordertContainerReducer;
