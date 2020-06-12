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
  makeSelectAddStoreSucceed,
  makeSelectRemoveStoreSucceed,
  makeSelectEditStoreSucceed
} from './selectors';
import {
  getStore as getStoreAction,
  setAddStore as setAddStoreAction,
  removeStore as removeStoreAction,
  editStore as editStoreAction,

} from './actions';

const key = 'storeManager';

const storeManager = props => {
  const {
    dataStore,
    getStore,
    setAddStore,
    addStoreSucceed,
    removeStore,
    removeStoreSucceed,
    editStore,
    editStoreSucceed
  } = props;
  const columns = React.useMemo(
    () => Column,
    []
  );
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getStore();
  }, []);

  useEffect(() => {
    if (addStoreSucceed || removeStoreSucceed || editStoreSucceed) {
      getStore();
    }
  }, [addStoreSucceed, removeStoreSucceed, editStoreSucceed]);

  const [skipPageReset, setSkipPageReset] = React.useState(false)


  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    const storeOriginal = dataStore[rowIndex];
    const newStore = {
      name: storeOriginal.name,
      baseUrl: storeOriginal.baseUrl,
      consumerKey: storeOriginal.consumerKey,
      consumerSecret: storeOriginal.consumerSecret,
      typeStore: storeOriginal.typeStore,
      active: storeOriginal.active,
      _id: storeOriginal._id
    }

    editStore({store: {...newStore, [columnId]: value}});
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
          removeStore={removeStore}
          updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      </div>
    </>
  )
}

const mapStateToProps = createStructuredSelector({
  dataStore: makeSelectdataStore(),
  addStoreSucceed: makeSelectAddStoreSucceed(),
  removeStoreSucceed: makeSelectRemoveStoreSucceed(),
  editStoreSucceed: makeSelectEditStoreSucceed(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  getStore: () => dispatch(getStoreAction()),
  setAddStore: data => dispatch(setAddStoreAction(data)),
  removeStore: data => dispatch(removeStoreAction(data)),
  editStore: data => dispatch(editStoreAction(data)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(storeManager);
