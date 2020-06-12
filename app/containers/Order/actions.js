import {
  UPLOAD_CSV,
  UPLOAD_CSV_SUCCEED,
  SYCN_DATA_STORE,
  SYCN_DATA_STORE_SUCCEED,
  SYCN_DATA_STORE_FAILED
} from './constants';

export const uploadCsvFileAction = data => ({
  type: UPLOAD_CSV,
  data,
});

export const uploadCsvSucceed = () => ({
  type: UPLOAD_CSV_SUCCEED,
});

export const syncDataAction = () => ({
  type: SYCN_DATA_STORE,
});
