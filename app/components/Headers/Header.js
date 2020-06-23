/* eslint-disable */

import React from 'react';

// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';


import DataPicker from 'components/Calendar/dashboardCalendar';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: '23%',
    float: 'right',
  },
  selectRange: {
    top: '-22px',
    color: 'white',
  },

}));

const Header = props => {
  const {
    setStateTimeRange,
    stateTimeRange,
    getDashboard,
    dashBoardInfoHeader
  } = props;
  const handleCloseToStatistic = () => {
    const filter = [{ startDate: stateTimeRange[0].startDate.toISOString(), endDate: stateTimeRange[0].endDate.toISOString() }];
    getDashboard(filter);
  }
  const classes = useStyles();
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            <Row>
              <Col lg="12" xl="12">
                <FormControl className={classes.margin}>
                  <InputLabel id="select-range-type-customized-select-label" className={classes.selectRange}>Select range</InputLabel>
                  <DataPicker
                    handleCloseToStatistic={handleCloseToStatistic}
                    setStateTimeRange={setStateTimeRange}
                    stateTimeRange={stateTimeRange}
                  />
                </FormControl>
              </Col>
            </Row>
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          NET REVENUE
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          ${dashBoardInfoHeader.netTotal.toFixed(2)}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                          <i className="fas fa-money-check-alt" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          ORDERS
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {dashBoardInfoHeader.orderTotal}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                          <i className="fab fa-first-order" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          ITEMS
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">{dashBoardInfoHeader.itemTotal}</span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                          <i className="fas fa-tag" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="6" xl="3">
                <Card className="card-stats mb-4 mb-xl-0">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          AVERAGE ORDER NET
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          ${dashBoardInfoHeader.orderTotal ? (dashBoardInfoHeader.netTotal/dashBoardInfoHeader.orderTotal).toFixed(2) : 0}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                          <i className="fas fa-chart-pie" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Header;
