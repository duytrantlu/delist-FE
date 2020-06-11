import React, { useMemo, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import saga from './sagas';
import reducer from './reducers';

import CssBaseline from '@material-ui/core/CssBaseline';
import EnhancedTable from 'components/storeManagement/EnhancedTable';
import Header from 'components/Headers/Header';
import Column from './makeTable';

import {
  makeSelectdataStore,
  makeSelectAddStoreSucceed
} from './selectors';
import {
  getStore as getStoreAction,
  setAddStore as setAddStoreAction

} from './actions';

const key = 'storeManager';

const storeManager = props => {
  const {
    dataStore,
    getStore,
    setAddStore,
    addStoreSucceed,
  } = props;
  const columns = React.useMemo(
    () => Column,
    []
  );
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(()=>{
    getStore();
  }, []);

  useEffect(() => {
    if (addStoreSucceed) {
      getStore();
    }
  }, [addStoreSucceed]);

  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    // editRole({user:{...dataWithoutMyself[rowIndex], role: value}})
  }

  return (
    <>
      <Header />
      <div>
        <CssBaseline />
        <EnhancedTable
          columns={columns}
          data={dataStore}
          setAddStore={setAddStore}
          // delUser={delUser}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  dataStore: makeSelectdataStore(),
  addStoreSucceed: makeSelectAddStoreSucceed()
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  getStore: () => dispatch(getStoreAction()),
  setAddStore: data => dispatch(setAddStoreAction(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(storeManager);
