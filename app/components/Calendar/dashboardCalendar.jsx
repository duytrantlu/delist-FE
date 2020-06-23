import React from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useState } from 'react';
import dateFormat from 'dateformat';
import Modal from '@material-ui/core/Modal';
import {
  modalDateTimePicker,
  calendarDasboardPicker
} from './styles';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';



const DataPicker = props => {
  const {
    stateTimeRange,
    setStateTimeRange,
    handleCloseToStatistic
  } = props;
  const [isShowCalendar, setShowCalendar] = useState(false);

  const handleClickOpenCalendar = () => {
    setShowCalendar(true);
  };

  const handleClose = () => {
    setShowCalendar(false);
    handleCloseToStatistic();
  }

  return (
    <>
      <Modal
        open={isShowCalendar}
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
      <div style={calendarDasboardPicker}>
        <InputGroup>
          <Input
            onClick={handleClickOpenCalendar}
            value={
              stateTimeRange.map(s => {
                return `${dateFormat(s.startDate, "dd/mm/yyyy")} - ${dateFormat(s.endDate, "dd/mm/yyyy")}`
              })
            }
          />
          <InputGroupAddon addonType="append">
            <InputGroupText><i className="fas fa-calendar"></i></InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </div>
    </>
  );
}

export default DataPicker;