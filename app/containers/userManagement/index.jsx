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
import Dialog from 'components/Dialog';
import Auth from 'utils/Auth';

import {
  makeSelectUsers,
  makeSelectAddUserSucceed,
  makeSelectDelUserSucceed,
  makeSelectEditUserSucceed,
  makeSelectMsgError
} from './selectors';
import {
  getUsers as getUsersAction,
  setDataAddUser as setDataAddUserAction,
  adminDelUserAction,
  editRoleUser as editRoleUserAction
} from './actions';

import {
  setHidePopup as setHidePopupAction
} from 'containers/App/actions';

import {
  makeSelectCurrentErrorStatus
} from 'containers/App/selectors';

import {
  getDashboard as getDashboardAction,
  setStateTimeRange as setStateTimeRangeAction
} from 'containers/Dashboard/actions';
import {
  makeSelectTimeSearch
} from 'containers/Dashboard/selectors';

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
    editRoleSucceed,
    globalErrorStatus,
    setHidePopup,
    msgErrors,
    getDashboard,
    setStateTimeRange,
    stateTimeRange
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
    getDashboard([{ startDate: stateTimeRange[0].startDate.toISOString(), endDate: stateTimeRange[0].endDate.toISOString() }]);
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
      <Header getDashboard={getDashboard} stateTimeRange={stateTimeRange} setStateTimeRange={setStateTimeRange} />
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
      </div>
      <Dialog setHidePopup ={setHidePopup} msgErrors={msgErrors} globalErrorStatus={globalErrorStatus}/>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  dataUser: makeSelectUsers(),
  addUserSucceed: makeSelectAddUserSucceed(),
  delUserSucceed: makeSelectDelUserSucceed(),
  editRoleSucceed: makeSelectEditUserSucceed(),
  globalErrorStatus: makeSelectCurrentErrorStatus(),
  msgErrors: makeSelectMsgError(),
  stateTimeRange: makeSelectTimeSearch(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  getData: () => dispatch(getUsersAction()),
  setAddUser: data => dispatch(setDataAddUserAction(data)),
  delUser: data => dispatch(adminDelUserAction(data)),
  editRole: data => dispatch(editRoleUserAction(data)),
  setHidePopup: () => dispatch(setHidePopupAction()),
  setStateTimeRange: time => dispatch(setStateTimeRangeAction(time)),
  getDashboard: filter => dispatch(getDashboardAction(filter))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(userManager);
