import React, { useMemo, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import saga from './sagas';
import reducer from './reducers';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from 'components/userManagement/EnhancedTable';
import Header from 'components/Headers/Header';
import Auth from 'utils/Auth';

import {
  makeSelectUsers,
  makeSelectAddUserSucceed,
  makeSelectDelUserSucceed,
  makeSelectEditUserSucceed
} from './selectors';
import {
  getUsers as getUsersAction,
  setDataAddUser as setDataAddUserAction,
  adminDelUserAction,
  editRoleUser as editRoleUserAction
} from './actions';
import SpeedDial from 'components/speedDial';

const key = 'userManagement';

const userManager = props => {
  const {
    dataUser,
    getData,
    setAddUser,
    addUserSucceed,
    delUser,
    delUserSucceed,
    editRole,
    editRoleSucceed
  } = props;
  const user = Auth.getUser();
  const columns = React.useMemo(
    () => [
      {
        Header: 'User',
        accessor: 'username',
      },
      {
        Header: 'Role',
        accessor: 'role',
      },
    ],
    []
  );
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(()=>{
    getData();
  }, [])

  useEffect(() => {
    if (addUserSucceed || delUserSucceed || editRoleSucceed) {
      getData();
    }
  }, [addUserSucceed, delUserSucceed, editRoleSucceed]);

  const removeMyself = () => {
    return dataUser.filter(u => u.username != user.username);
  }

  const dataWithoutMyself = removeMyself();

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    editRole({user:{...dataWithoutMyself[rowIndex], role: value}})
  }

  return (
    <>
      <Header />
      <div>
        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={dataWithoutMyself}
          setAddUser={setAddUser}
          delUser={delUser}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
        <SpeedDial/>
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectUsers(),
  addUserSucceed: makeSelectAddUserSucceed(),
  delUserSucceed: makeSelectDelUserSucceed(),
  editRoleSucceed: makeSelectEditUserSucceed(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  getData: () => dispatch(getUsersAction()),
  setAddUser: data => dispatch(setDataAddUserAction(data)),
  delUser: data => dispatch(adminDelUserAction(data)),
  editRole: data => dispatch(editRoleUserAction(data))

});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(userManager);
