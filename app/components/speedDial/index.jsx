import React, { useMemo, useEffect, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import ModalUpload from 'components/Modal';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import DataPicker from 'components/Calendar/exportCalendar';
import { addDays, subMonths } from 'date-fns';


const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const actions = [
  { icon: <CloudUploadIcon />, name: 'Upload', id: "uploadAction" },
  { icon: <SyncIcon />, name: 'Sync Data', id: "syncDataAction" },
  { icon: <SyncDisabledIcon />, name: 'Synchronizing', id: "syncDisable" },
  { icon: <ImportExportIcon />, name: 'Export', id: "exportCsv" }
];

export default function OpenIconSpeedDial(props) {
  const { uploadCsv, syncData, syncStatus, exportCsv, exceptionImportFileCancel, role } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [stateTimeRange, setStateTimeRange] = React.useState([
    {
      startDate: subMonths(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);
  const [openSelectDate, setOpenSelectDate] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  }

  const handleClick = () => {
    handleClose();
    setOpenModal(true);
  }

  const handleClickSync = () => {
    syncData();
  }

  const handleClickExport = () => {
    setOpenSelectDate(true);
  }

  const handleCloseToExport = () => {
    const filter = [{ startDate: stateTimeRange[0].startDate.toISOString(), endDate: stateTimeRange[0].endDate.toISOString() }];
    exportCsv(filter);
  }

  const handleClickSyncDisable = e => {
    e.preventDefault();
  }

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        // hidden={hidden}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => {
          if (action.id === 'uploadAction') {
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClick}
              />
            )
          }
          if (syncStatus && action.id === 'syncDisable') {
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClickSyncDisable}
              />
            )
          }
          if (!syncStatus && action.id === 'syncDataAction') {
            if (role === 'User') return null;
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClickSync}
              />
            )
          }
          if (action.id === 'exportCsv') {
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClickExport}
              />
            )
          }
        })}
      </SpeedDial>
      <DataPicker
        setStateTimeRange={setStateTimeRange}
        stateTimeRange={stateTimeRange}
        openSelectDate={openSelectDate}
        setOpenSelectDate={setOpenSelectDate}
        handleCloseToExport={handleCloseToExport}
      />
      {openModal && <ModalUpload
        openModal={openModal}
        handleCloseModal={handleCloseModal}
        uploadCsv={uploadCsv}
        exceptionImportFileCancel={exceptionImportFileCancel}
      />}
    </>
  );
}
