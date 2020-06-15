/* eslint-disable */

import React, { useMemo, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import saga from './sagas';
import reducer from './reducers';


import {
  makeSelectLoading,
  makeSelectSyncStatus,
  makeSelectTableLoading,
  makeSelectOrders,
  makeSelectPages,
  makeSelectTotalItems
} from './selectors';
import {
  uploadCsvFileAction,
  syncDataAction,
  getOrders as getOrdersAction
} from './actions';

// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from 'reactstrap';
import { TablePagination } from '@trendmicro/react-paginations';
import '@trendmicro/react-paginations/dist/react-paginations.css';
// core components
import Header from 'components/Headers/Header';
import SpeedDial from 'components/speedDial';
import Loading from 'components/Loading';

const key = 'order';

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
    totalItems
  } = props;

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageLength, setPageLength] = React.useState(10);
  useEffect(() => {
    getOrders(1, 10)
  }, []);

  const renderTable = () => {
    return listOrders.map(order => {
      return (
        <tr>
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
            {order.total}
            <br />
            {order.payment_method_title}
          </td>
          <td>{order.line_items.length} item(s)</td>
          <td>{order.tracking_number ? order.tracking_number : (<i class="fa fa-minus"></i>)}</td>
        </tr>
      )
    })
  }

  const onPageChange = opts => {
    console.log("=====opts====", opts)
    setCurrentPage(opts.page);
    setPageLength(opts.pageLength);
    getOrders(opts.page, opts.pageLength);
  }
  console.log("===currentPage===", currentPage)
  console.log("===pageLength===", pageLength)

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Card tables</h3>
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
                <SpeedDial uploadCsv={uploadCsv} syncData={syncData} syncStatus={syncStatus} />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
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
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  uploadCsv: data => dispatch(uploadCsvFileAction(data)),
  syncData: () => dispatch(syncDataAction()),
  getOrders: (page, limit) => dispatch(getOrdersAction(page, limit)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Order);
