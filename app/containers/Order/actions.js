import { UPLOAD_CSV, UPLOAD_CSV_SUCCEED } from './constants';

export const uploadCsvFileAction = data => ({
  type: UPLOAD_CSV,
  data,
});

export const uploadCsvSucceed = () => ({
  type: UPLOAD_CSV_SUCCEED,
});
