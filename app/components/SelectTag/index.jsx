import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Roles from 'utils/roles';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SimpleSelect(props) {
  const {role, onBlur, setValue} = props;
  const classes = useStyles();
  const [newRole, setNewRole] = React.useState('');

  const handleChange = (event) => {
    setNewRole(event.target.value);
    setValue(event.target.value);
  };

  const renderRole = () => {
    return Roles.map().map(r=>{
      return (<MenuItem value={r.value}>{r.value}</MenuItem>)
    })
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">{role}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newRole}
          onChange={handleChange}
          onBlur={onBlur}
        >
          {renderRole()}
        </Select>
      </FormControl>
    </div>
  );
}
