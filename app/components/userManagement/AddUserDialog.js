/* eslint-disable */

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
import Tooltip from '@material-ui/core/Tooltip';
import ModelValidations from 'utils/model-validation';
import FormValidationErrors from 'components/FormErrors/validateSignup';

const initialUser = {
  username: '',
  password: '',
  confirmPwd: '',
};

const initialErrorValidate = {
  username: {
    valid: false,
    touched: false,
    message: ModelValidations.username.regex.message,
  },
  password: {
    valid: false,
    touched: false,
    message: ModelValidations.password.minLength.message,
  },
  confirmPwd: {
    valid: false,
    touched: false,
    message: 'Password confirm does not match.',
  },
  formValid: false,
};

const AddUserDialog = props => {
  const [user, setUser] = useState(initialUser);
  const [validation, setValidation] = useState(initialErrorValidate);
  const { addUserHandler } = props;
  const [open, setOpen] = React.useState(false);

  const [switchState, setSwitchState] = React.useState({
    addMultiple: false,
  });

  const handleSwitchChange = name => event => {
    setSwitchState({ ...switchState, [name]: event.target.checked });
  };

  const resetSwitch = () => {
    setSwitchState({ addMultiple: false });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetSwitch();
  };

  const handleAdd = event => {
    // new code here
    addUserHandler(user);
    setUser(initialUser);
    switchState.addMultiple ? setOpen(true) : setOpen(false);
  };

  const handleChange = name => ({ target: { value } }) => {
    setUser({ ...user, [name]: value });
    validate(name, value);
  };

  const validate = (field, value) => {
    if (validation[field]) validation[field].touched = true;
    switch (field) {
      case 'username':
        validation.username.valid = ModelValidations.username.regex.value.test(
          value,
        );
        break;
      case 'password':
        validation.password.valid =
          value.length >= ModelValidations.password.minLength.value;
        break;
      case 'confirmPwd':
        validation.confirmPwd.valid = value === user.password;
        break;
    }

    validation.formValid = true;
    Object.keys(validation).forEach(key => {
      if (
        typeof validation[key].valid === 'boolean' &&
        !validation[key].valid
      ) {
        validation.formValid = false;
      }
    });
    setValidation({ ...validation });
  };

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
        <DialogTitle id="form-dialog-title">Add User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormValidationErrors validation={validation} />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="User Name"
            type="text"
            name="username"
            fullWidth
            value={user.username}
            onChange={handleChange('username')}
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            name="password"
            value={user.password}
            onChange={handleChange('password')}
          />
          <TextField
            margin="dense"
            label="Confirm Password"
            type="password"
            fullWidth
            name="confirmPwd"
            value={user.confirmPwd}
            onChange={handleChange('confirmPwd')}
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
          <Button
            disabled={!validation.formValid}
            onClick={handleAdd}
            color="primary"
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

AddUserDialog.propTypes = {
  addUserHandler: PropTypes.func.isRequired,
};

export default AddUserDialog;
