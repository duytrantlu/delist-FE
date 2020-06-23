/* eslint-disable */

import React, { useMemo, useEffect, memo } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import saga from './sagas';
import reducer from './reducers';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
} from 'reactstrap';

import Header from 'components/Headers/Header';

import {
  getDashboard as getDashboardAction,
  setStateTimeRange as setStateTimeRangeAction
} from './actions';
import {
  makeSelectTimeSearch,
  makeSelectDashboardInfo
} from './selectors';

const key = 'dashboard';

const Index = props => {
  const {
    getDashboard,
    setStateTimeRange,
    stateTimeRange,
    dashBoardInfo
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getDashboard(stateTimeRange);
  }, [])

  const renderStores = storeInfo => {
    const rows = [];
    for (let [s, v] of Object.entries(storeInfo)) {
      rows.push(<tr>
        <th scope="row">{s}</th>
        <td>${v.netStore.toFixed(2)}</td>
        <td>{v.orderStore}</td>
      <td>{v.itemStore}</td>
      <td>${v.orderStore ? (v.netStore/v.orderStore).toFixed(2) : 0}</td>
      <td>{v.itemStore ? (v.orderStore/v.itemStore).toFixed(2) :0 }</td>
      </tr>)
    }

    return rows;
  }
  return (
    <>
      <Header dashBoardInfoHeader={dashBoardInfo.headerInfo} getDashboard={getDashboard} stateTimeRange={stateTimeRange} setStateTimeRange={setStateTimeRange} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="12">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Stores</h3>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Store</th>
                    <th scope="col">Net Revenue</th>
                    <th scope="col">Orders</th>
                    <th scope="col">Items</th>
                    <th scope="col">AOV</th>
                    <th scope="col">Average Order Items</th>
                  </tr>
                </thead>
                <tbody>
                  {renderStores(dashBoardInfo.storeInfo)}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  stateTimeRange: makeSelectTimeSearch(),
  dashBoardInfo: makeSelectDashboardInfo(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
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
)(Index);
