import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';
import ModalUpload from 'components/Modal';
import SyncIcon from '@material-ui/icons/Sync';
import SyncDisabledIcon from '@material-ui/icons/SyncDisabled';

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
  { icon: <SyncDisabledIcon />, name: 'Synchronizing', id: "syncDisable" }
];

export default function OpenIconSpeedDial(props) {
  const { uploadCsv, syncData, syncStatus } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

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
            return (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={handleClickSync}
              />
            )
          }
        })}
      </SpeedDial>
      {openModal && <ModalUpload openModal={openModal} handleCloseModal={handleCloseModal} uploadCsv={uploadCsv} />}
    </>
  );
}
