import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const initialUser = {
  name: '',
  baseUrl:'',
  consumerKey: '',
  consumerSecret: '',
  typeStore:'',
  active: false,
}

const AddStoreDialog = props => {
  const {addStoreHandler} = props;
  const [store, setStore] = useState(initialUser)
  const [open, setOpen] = React.useState(false)

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  })

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked })
  }

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false })
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    resetSwitch()
  }

  const handleAdd = event => {
    addStoreHandler(store);
    setStore(initialUser)
    switchState.addMultiple ? setOpen(true) : setOpen(false)
  }

  const handleChange = name => ({ target: { value } }) => {
    setStore({ ...store, [name]: value })
  }

  const handleChangeCheckboc = event => {
    setStore({ ...store, [event.target.name]: event.target.checked })
  }

  return (
    <div>
      <Tooltip title="Add">
        <IconButton aria-label="add" onClick={handleClickOpen}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Store</DialogTitle>
        <DialogContent>
          <DialogContentText>Add store to manage.</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            type="text"
            fullWidth
            value={store.name}
            onChange={handleChange('name')}
          />
          <TextField
            margin="dense"
            label="Base URL"
            type="text"
            fullWidth
            value={store.baseUrl}
            onChange={handleChange('baseUrl')}
          />
          <TextField
            margin="dense"
            label="Consumer Key"
            type="text"
            fullWidth
            value={store.consumerKey}
            onChange={handleChange('consumerKey')}
          />
          <TextField
            margin="dense"
            label="Consumer Secret"
            type="text"
            fullWidth
            value={store.consumerSecret}
            onChange={handleChange('consumerSecret')}
          />
          <TextField
            margin="dense"
            label="Store Type"
            type="text"
            fullWidth
            value={store.typeStore}
            onChange={handleChange('typeStore')}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={store.active}
                onChange={handleChangeCheckboc}
                name="active"
                color="primary"
              />
            }
            label="Active"
          />
        </DialogContent>
        <DialogActions>
          <Tooltip title="Add multiple">
            <Switch
              checked={switchState.addMultiple}
              onChange={handleSwitchChange('addMultiple')}
              value="addMultiple"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Tooltip>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

AddStoreDialog.propTypes = {
  addStoreHandler: PropTypes.func.isRequired,
}

export default AddStoreDialog
