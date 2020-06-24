/* eslint-disable */

import React, { useMemo, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from 'components/Dialog';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

import Select from 'react-select';
import { addDays, subMonths } from 'date-fns';

import IconButton from "@material-ui/core/IconButton";
import { Button } from '@material-ui/core';
import SearchIcon from "@material-ui/icons/Search";
import { CSVLink } from "react-csv";



import DataPicker from 'components/Calendar';

import saga from './sagas';
import reducer from './reducers';


import {
  makeSelectLoading,
  makeSelectSyncStatus,
  makeSelectTableLoading,
  makeSelectOrders,
  makeSelectPages,
  makeSelectTotalItems,
  makeSelectSyncDataSucceed,
  makeSelectdataStore,
  makeSelectStatusGetStore,
  makeSelectExportCsvStatus,
  makeSelectDataExport,
  makeSelectGetExportDataStatus,
  makeSelectMsgErrors,
  makeSelectUpdateOrderStatus
} from './selectors';
import {
  uploadCsvFileAction,
  syncDataAction,
  getOrders as getOrdersAction,
  getStore as getStoreAction,
  exportCsv as exportCsvAction,
  performExportCsv as performExportCsvAction,
  performExportCsvScucceed as performExportCsvScucceedAction,
  exceptionImportFile
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
  makeSelectTimeSearch,
  makeSelectDashboardInfo
} from 'containers/Dashboard/selectors';

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Table,
  Container,
  Row,
} from 'reactstrap';
import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';
// core components
import Header from 'components/Headers/Header';
import SpeedDial from 'components/speedDial';
import Loading from 'components/Loading';

const key = 'order';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  groupTextFieldLeft: {
    width: '40%',
  },
  groupTextFieldRight: {
    width: '40%',
    marginLeft: '10%'
  },
  margin: {
    margin: theme.spacing(1),
    width: '30%'
  },
  btnSearch: {
    backgroundColor: '#27c24c',
    color: 'white',
    height: '45px'
  },
  groupSearchBtn: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  selectRange: {
    top: '-22px',
  },
  orderStatusSelect: {
    paddingTop: '25px',
  }
}));

const Order = props => {
  const {
    loading,
    uploadCsv,
    syncStatus,
    syncData,
    getOrders,
    listOrders,
    tableLoading,
    totalPage,
    totalItems,
    syncDataSucceed,
    dataStores,
    getStore,
    getStoreStatus,
    exportCsv,
    exportCsvStatus,
    dataExport,
    performExportCsv,
    getDataExportStatus,
    performExportCsvScucceed,
    globalErrorStatus,
    setHidePopup,
    msgErrors,
    updateOrderStatus,
    exceptionImportFile,
    setStateTimeRangeDashboard,
    stateTimeRangeDashboard,
    getDashboard,
    dashBoardInfo
  } = props;
  console.log(listOrders);
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLength, setPageLength] = React.useState(10);
  const [selectedStore, setSelectedStore] = React.useState([]);
  const [selectedEmail, setSelectedEmail] = React.useState("");
  const [selectedPaymentMethod, setSelectedStorePaymentMethod] = React.useState({ label: "Any", value: "" });
  const [selectedPaypal, setSelectedStorePaypal] = React.useState({ label: "Any", value: "" });
  const [selectedShipped, setSelectedStoreShipped] = React.useState({ label: "Any", value: "" });
  const [selectedDateType, setselectedDateType] = React.useState([{ label: "Created date", value: 'date_created' }]);
  const [selectedStatus, setSelectedStatus] = React.useState([]);
  const [stateTimeRange, setStateTimeRange] = React.useState([
    {
      startDate: subMonths(new Date(), 1),
      endDate: addDays(new Date(), 1),
      key: 'selection'
    }
  ]);

  const csvLinkClick = React.useRef();
  useEffect(() => {
    getOrders(1, 10);
    getStore();
    getDashboard([{ startDate: stateTimeRangeDashboard[0].startDate.toISOString(), endDate: stateTimeRangeDashboard[0].endDate.toISOString() }]);
  }, []);

  useEffect(() => {
    if (getDataExportStatus && dataExport.length > 0) {
      performExportCsv();
    }
  }, [dataExport, getDataExportStatus]);

  useEffect(() => {
    if (exportCsvStatus) {
      csvLinkClick.current.link.click();
      performExportCsvScucceed();
    }
  }, [exportCsvStatus]);

  useEffect(() => {
    if (syncDataSucceed || updateOrderStatus) {
      getOrders(1, 10);
      setCurrentPage(1);
    }
    if (getStoreStatus) {
      getStore();
    }
  }, [syncDataSucceed, getStoreStatus, updateOrderStatus]);

  const renderTable = () => {
    return listOrders.map((order, key) => {
      return (
        <tr key={key}>
          <th scope="row">
            <a
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              {order.number}
            </a>
            <br />
            <span className="mb-0 text-sm">
              {order.date_created}
            </span>
          </th>
          <td>{order.billing.first_name + ' ' + order.billing.last_name}</td>
          <td>{order.billing.phone}</td>
          <td>{order.billing.email}</td>
          <td>{order.status}</td>
          <td>
            {(order.currency_symbol ? order.currency_symbol : (order.currency === 'USD' ? '$' : '')) + order.total}
            <br />
            {order.payment_method_title}
          </td>
          <td>{order.line_items.length} item(s)</td>
          <td>{order.tracking_number ? order.tracking_number : (<i className="fa fa-minus"></i>)}</td>
        </tr>
      )
    })
  }

  const onPageChange = opts => {
    setCurrentPage(opts.page);
    setPageLength(opts.pageLength);
    const filter = makeFilter();
    getOrders(opts.page, opts.pageLength, filter);
  }
  const handleSelectedStore = selectedOption => {
    setSelectedStore(selectedOption)
  }
  const handleSelectedPaymentMethod = selectedOption => {
    setSelectedStorePaymentMethod(selectedOption);
  }
  const handleSelectedPaypal = selectedOption => {
    setSelectedStorePaypal(selectedOption);
  }
  const handleSelectedStatus = selectedOption => {
    setSelectedStatus(selectedOption);
  }
  const handleSelectedShipped = selectedOption => {
    setSelectedStoreShipped(selectedOption);
  }
  const handleSelectedDateType = selectedOption => {
    setselectedDateType(selectedOption)
  }

  const makeFilter = () => {
    const storesSelected = [];
    const statusOrderSelected = [];
    if (selectedStore) selectedStore.map(s => {
      storesSelected.push(s.label);
    });
    if (selectedStatus) selectedStatus.map(o => {
      statusOrderSelected.push(o.value)
    });
    const filter = [
      {
        store: storesSelected
      },
      {
        payment_method: selectedPaymentMethod.value
      },
      {
        updated_paypal: selectedPaypal.value
      },
      {
        status: statusOrderSelected
      },
      {
        shipped: selectedShipped.value
      },
      {
        date_created: `${stateTimeRange[0].startDate.toISOString()}/${stateTimeRange[0].endDate.toISOString()}`
      },
      {
        email: selectedEmail
      }
    ]
    return filter;
  }
  const handleFilter = e => {
    e.preventDefault();
    const filter = makeFilter();
    getOrders(1, 10, filter);
  }
  const classes = useStyles();

  const optionsStore = dataStores ? dataStores.map(st => {
    return { label: st.name, value: st._id }
  }) : [];

  const optionsPayment = [
    { label: "Any", value: "" },
    { label: "Stripe", value: "stripe" },
    { label: "Paypal", value: "paypal" },
  ];

  const optionsPaypal = [
    { label: "Any", value: "" },
    { label: "No", value: 0 },
    { label: "Yes", value: 1 },
  ];

  const optionsStatus = [
    { label: "Failed", value: 'failed' },
    { label: "Processing", value: 'processing' },
    { label: "pending", value: 'pending' },
    { label: "Completed", value: 'completed' },
    { label: "Cancelled", value: 'cancelled' },
    { label: "On-hold", value: 'on-hold' },
    { label: "Refunded", value: 'refunded' },
  ];
  const optionsShipped = [
    { label: "Any", value: "" },
    { label: "No", value: 0 },
    { label: "Shipped", value: 1 },
  ];
  const optionsDateType = [
    { label: "Created date", value: 'date_created' },
    { label: "Modified date", value: 'date_modified' },
    { label: "Paid date", value: 'date_paid' },
    { label: "Completed date", value: 'date_completed' },
    { label: "Exported date", value: 'date_exported' },
    { label: "Shipped date", value: 'data_shipped' }
  ];

  return (
    <>
      <Header dashBoardInfoHeader={dashBoardInfo.headerInfo} getDashboard={getDashboard} stateTimeRange={stateTimeRangeDashboard} setStateTimeRange={setStateTimeRangeDashboard} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <div className={classes.root}>
                  <div className={classes.groupTextFieldLeft}>
                    <Select
                      options={optionsStore}
                      value={selectedStore}
                      onChange={handleSelectedStore}
                      isMulti
                      placeholder={"Select store(s)"}
                    />
                    <br />
                    <div>
                      <FormControl className={classes.margin}>
                        <InputLabel id="payment-method-customized-select-label" className={classes.selectRange}>Payment method</InputLabel>
                        <Select
                          options={optionsPayment}
                          value={selectedPaymentMethod}
                          onChange={handleSelectedPaymentMethod}
                          className={classes.orderStatusSelect}
                        />
                      </FormControl>

                      <FormControl className={classes.margin}>
                        <InputLabel id="updated-paypal-customized-select-label" className={classes.selectRange}>Updated Paypal</InputLabel>
                        <Select
                          options={optionsPaypal}
                          value={selectedPaypal}
                          onChange={handleSelectedPaypal}
                          className={classes.orderStatusSelect}
                        />
                      </FormControl>
                      <FormControl className={classes.margin}>
                        <InputLabel id="demo-customized-select-label" className={classes.selectRange}>Order status</InputLabel>
                        <Select
                          options={optionsStatus}
                          value={selectedStatus}
                          onChange={handleSelectedStatus}
                          className={classes.orderStatusSelect}
                          isMulti
                        />
                      </FormControl>

                    </div>
                  </div>
                  <div className={classes.groupTextFieldRight}>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText></InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Filter by Email, Phone ..." onChange={e => setSelectedEmail(e.target.value)} value={selectedEmail} />
                    </InputGroup>
                    <br />
                    <div>
                      <FormControl className={classes.margin}>
                        <InputLabel id="shipped-customized-select-label" className={classes.selectRange}>Shipped</InputLabel>
                        <Select
                          options={optionsShipped}
                          value={selectedShipped}
                          onChange={handleSelectedShipped}
                          className={classes.orderStatusSelect}
                        />
                      </FormControl>

                      <FormControl className={classes.margin}>
                        <InputLabel id="date-type-customized-select-label" className={classes.selectRange}>Date type</InputLabel>
                        <Select
                          options={optionsDateType}
                          value={selectedDateType}
                          onChange={handleSelectedDateType}
                          className={classes.orderStatusSelect}
                        />
                      </FormControl>


                      <FormControl className={classes.margin}>
                        <InputLabel id="select-range-type-customized-select-label" className={classes.selectRange}>Select range</InputLabel>
                        <DataPicker setStateTimeRange={setStateTimeRange} stateTimeRange={stateTimeRange} />
                      </FormControl>
                    </div>
                  </div>
                  <div className={classes.groupSearchBtn}>
                    <Button variant="contained" color="green" className={classes.btnSearch} onClick={handleFilter}>
                      Search
                        <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col"># Order Number</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Phone	</th>
                    <th scope="col">Email</th>
                    <th scope="col">Status</th>
                    <th scope="col">Total</th>
                    <th scope="col">Items</th>
                    <th scope="col">Tracking</th>
                  </tr>
                </thead>
                <tbody>
                  {renderTable()}
                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <TablePagination
                    type="full"
                    page={currentPage}
                    pageLength={pageLength}
                    totalRecords={totalItems}
                    onPageChange={onPageChange}
                    prevPageRenderer={() => <i className="fa fa-angle-left" />}
                    nextPageRenderer={() => <i className="fa fa-angle-right" />}
                  />
                </nav>
                <SpeedDial
                  uploadCsv={uploadCsv}
                  syncData={syncData}
                  syncStatus={syncStatus}
                  exportCsv={exportCsv}
                  exportCsvStatus={exportCsvStatus}
                  exceptionImportFile={exceptionImportFile}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
        <CSVLink
          data={dataExport}
          filename={`delist_fullfill_${new Date().getTime()}.csv`}
          className="btn btn-primary"
          target="_blank"
          ref={csvLinkClick}
          style={{ 'display': 'none' }}
        />
      </Container>
      <Dialog setHidePopup={setHidePopup} msgErrors={msgErrors} globalErrorStatus={globalErrorStatus} />
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  syncStatus: makeSelectSyncStatus(),
  listOrders: makeSelectOrders(),
  tableLoading: makeSelectTableLoading(),
  totalPage: makeSelectPages(),
  totalItems: makeSelectTotalItems(),
  syncDataSucceed: makeSelectSyncDataSucceed(),
  dataStores: makeSelectdataStore(),
  getStoreStatus: makeSelectStatusGetStore(),
  exportCsvStatus: makeSelectExportCsvStatus(),
  dataExport: makeSelectDataExport(),
  getDataExportStatus: makeSelectGetExportDataStatus(),
  globalErrorStatus: makeSelectCurrentErrorStatus(),
  msgErrors: makeSelectMsgErrors(),
  updateOrderStatus: makeSelectUpdateOrderStatus(),
  stateTimeRangeDashboard: makeSelectTimeSearch(),
  dashBoardInfo: makeSelectDashboardInfo(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  uploadCsv: data => dispatch(uploadCsvFileAction(data)),
  syncData: () => dispatch(syncDataAction()),
  getOrders: (page, limit, filter) => dispatch(getOrdersAction(page, limit, filter)),
  getStore: () => dispatch(getStoreAction()),
  exportCsv: filter => dispatch(exportCsvAction(filter)),
  performExportCsv: () => dispatch(performExportCsvAction()),
  performExportCsvScucceed: () => dispatch(performExportCsvScucceedAction()),
  setHidePopup: () => dispatch(setHidePopupAction()),
  exceptionImportFile: err => dispatch(exceptionImportFile(err)),
  setStateTimeRangeDashboard: time => dispatch(setStateTimeRangeAction(time)),
  getDashboard: filter => dispatch(getDashboardAction(filter))
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Order);
