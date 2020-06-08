import React, { memo, useMemo } from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import ModelValidations from 'utils/model-validation';
import FormValidationErrors from 'components/FormErrors/validateSignup';
import FormSubmitErrors from 'components/FormErrors/submitSignupError';
import Auth from 'utils/Auth';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader";
import reducer from './reducers';
import saga from './sagas';
import {
  startEditPwd as startEditPwdAction,
  onChanageNewPasswd as onChanageNewPasswdAction,
  onChanageConfNewPasswd as onChanageConfNewPasswdAction,
  resetMsgErrors as resetMsgErrorsAction,
  onChanageSetValidation as onChanageSetValidation,
  changePasswordAction
} from './actions';

import {
  makeSelectStartEdit,
  makeSelectValidation,
  makeSelectNewpwd,
  makeSelectConfNewpwd,
  makeSelectChangeSucceed,
  makeSelectMsgError
} from './selectors';

const key = 'userProfile';

const Profile = props => {
  const user = Auth.getUser();
  const {
    startEditPwd,
    startEdit,
    onChanageNewPasswd,
    onChanageConfNewPasswd,
    validation,
    resetMsgErrors,
    newpassword,
    renewpassword,
    setValidation,
    callChangePassword,
    msgErrors,
    changePassSuccess,
    history
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useMemo(()=>{
    if(changePassSuccess){
      history.push('/');
    }
  }, [changePassSuccess]);

  const onChangeFieldNewPassword = e => {
    const field = e.target.name;
    const value = e.target.value;
    onChanageNewPasswd(value);
    validate(field, value);
    resetMsgErrors();
  };

  const onChanageFieldConfNewPasswd = e => {
    const field = e.target.name;
    const value = e.target.value;
    onChanageConfNewPasswd(value);
    validate(field, value);
    resetMsgErrors();
  }
  const onClickCallChangePassword = e =>{
    e.preventDefault();
    callChangePassword({user: {...user, password: newpassword}});
  }

  const validate = (field, value) => {
    if (validation[field]) validation[field].touched = true;
    switch (field) {
      case 'newpassword':
        validation.newpassword.valid = value.length >= ModelValidations.password.minLength.value;
        break;
      case 'renewpassword':
        validation.renewpassword.valid = value === newpassword;
        break;
    }

    validation.formValid = true;
    Object.keys(validation).forEach((key) => {
      if (typeof validation[key].valid === 'boolean' && !validation[key].valid) {
        validation.formValid = false;
      }
    });
    setValidation(validation.formValid);
  }

  return (
    <>
      <UserHeader user={user} changePassAction={startEditPwd} startEdit={startEdit}/>
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("assets/img/theme/team-4-800x800.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    {user.username}
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="sm"
                  >
                    {user.role}
                  </Button>
                </div>
              </CardHeader>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">My account</h3>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      disabled={!validation.formValid}
                      color="primary"
                      onClick={onClickCallChangePassword}
                      size="sm"
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Username
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue={user.username}
                            id="input-username"
                            placeholder="Username"
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-role"
                          >
                            Role
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-role"
                            defaultValue={user.role}
                            type="text"
                            readOnly
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    {startEdit && <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="newpassword"
                            id="input-new-passwd"
                            placeholder="New Password"
                            type="password"
                            onChange={onChangeFieldNewPassword}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Confirm New Password
                          </label>
                          <Input
                            className="form-control-alternative"
                            name="renewpassword"
                            id="input-confirm-new-passwd"
                            placeholder="Confirm new password"
                            type="password"
                            onChange={onChanageFieldConfNewPasswd}
                          />
                        </FormGroup>
                      </Col>
                      <FormValidationErrors validation={validation}/>
                      <FormSubmitErrors errors={msgErrors}/>
                    </Row>}
                  </div>
                  <hr className="my-4" />
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Profile.defaultProps = {
  msgErrors:[]
};

const mapStateToProps = createStructuredSelector({
  startEdit: makeSelectStartEdit(),
  validation: makeSelectValidation(),
  newpassword: makeSelectNewpwd(),
  renewpassword: makeSelectConfNewpwd(),
  changePassSuccess:makeSelectChangeSucceed(),
  msgErrors: makeSelectMsgError(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  startEditPwd: () =>
    dispatch(startEditPwdAction()),
  onChanageNewPasswd: newpwd => dispatch(onChanageNewPasswdAction(newpwd)),
  onChanageConfNewPasswd: confNewpwd => dispatch(onChanageConfNewPasswdAction(confNewpwd)),
  resetMsgErrors: () => dispatch(resetMsgErrorsAction()),
  setValidation: status => dispatch(onChanageSetValidation(status)),
  callChangePassword: data=>dispatch(changePasswordAction(data)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withConnect,
  memo,
)(Profile);

