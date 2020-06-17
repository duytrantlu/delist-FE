import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import dateFormat from 'dateformat';
import Modal from '@material-ui/core/Modal';
import {
  modalDateTimePicker,
} from './styles';



const DataPicker = props => {
  const {
    stateTimeRange,
    setStateTimeRange,
    openSelectDate,
    setOpenSelectDate,
    handleCloseToExport
  } = props;

  const handleClose = () => {
    setOpenSelectDate(false);
    handleCloseToExport();
  }

  return (
    <>
      <Modal
        open={openSelectDate}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={modalDateTimePicker}
      >
        <DateRangePicker
          dateDisplayFormat={"dd-MM-yyyy"}
          onChange={item => setStateTimeRange([item.selection])}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          ranges={stateTimeRange}
          direction="horizontal"
          onCalendarClose={() => alert('close')}
        />
      </Modal>
    </>
  );
}

export default DataPicker;