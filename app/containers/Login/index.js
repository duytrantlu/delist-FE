/* eslint-disable */

import React, { useEffect, useMemo, memo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import ModelValidations from 'utils/model-validation';
import FormValidationErrors from 'components/FormErrors/validateSignup';
import FormSubmitErrors from 'components/FormErrors/submitSignupError';
import Auth from 'utils/Auth';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import {
  loginAction,
  changeUserName as changeUserNameAction,
  changePassword as changePasswordAction,
  resetMsgErrors as resetMsgErrorsAction,
  loginSetValidation as loginSetValidationAction,
} from './actions';

import {
  makeSelectUsername,
  makeSelectPassword,
  getMessageErrorLogin,
  makeSelectValidation,
  makeSelectloginSuccess,
} from './selectors';

import saga from './sagas';
import reducer from './reducers';

// reactstrap components

const key = 'login';

const Login = props => {
  const {
    changeUserName,
    changePassword,
    userName,
    password,
    loginHandler,
    loginErrMsg,
    validation,
    setValidation,
    resetMsgErrors,
    loginSucceed,
    history,
    dispatch,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    if (Auth.isAuthenticated()) {
      Auth.deauthenticateUser();
      history.push('/auth/login');
    }
  }, []);

  useMemo(() => {
    if (loginSucceed) {
      history.push('/');
    }
  }, [loginSucceed]);

  const keyDown = event => {
    if (event.keyCode === 13) {
      onBtnSignInClick(event);
    }
  };

  const onBtnSignInClick = e => {
    e.preventDefault();
    loginHandler({ userName, password });
  };

  const onChangeFieldUsername = e => {
    const field = e.target.name;
    const { value } = e.target;
    changeUserName(value);
    validate(field, value);
    resetMsgErrors();
  };

  const onChangeFieldPassword = e => {
    const field = e.target.name;
    const { value } = e.target;
    changePassword(value);
    validate(field, value);
    resetMsgErrors();
  };

  const validate = (field, value) => {
    if (validation[field]) validation[field].touched = true;
    switch (field) {
      case 'username':
        validation.username.valid = ModelValidations.username.regex.value.test(
          value,
        );
        break;
      case 'password':
        validation.password.valid =
          value.length >= ModelValidations.password.minLength.value;
        break;
    }

    validation.formValid = true;
    Object.keys(validation).forEach(key => {
      if (
        typeof validation[key].valid === 'boolean' &&
        !validation[key].valid
      ) {
        validation.formValid = false;
      }
    });
    setValidation(validation.formValid);
  };

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-3">
              <small>Sign in</small>
            </div>
          </CardHeader>
          <FormValidationErrors validation={validation} />
          <FormSubmitErrors errors={loginErrMsg} />
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onKeyDown={keyDown}
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={onChangeFieldUsername}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    onKeyDown={keyDown}
                    placeholder="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    onChange={onChangeFieldPassword}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button
                  disabled={!validation.formValid}
                  onClick={onBtnSignInClick}
                  className="my-4"
                  color="primary"
                  type="button"
                >
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <Link to="/auth/register">
              <small>Create new account</small>
            </Link>
          </Col>
        </Row>
      </Col>
    </>
  );
};

Login.defaultProps = {
  loginErrMsg: '',
};

const mapStateToProps = createStructuredSelector({
  userName: makeSelectUsername(),
  password: makeSelectPassword(),
  loginErrMsg: getMessageErrorLogin(),
  validation: makeSelectValidation(),
  loginSucceed: makeSelectloginSuccess(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  loginHandler: ({ userName, password }) =>
    dispatch(loginAction({ userName, password })),
  changeUserName: userName => dispatch(changeUserNameAction(userName)),
  changePassword: password => dispatch(changePasswordAction(password)),
  resetMsgErrors: () => dispatch(resetMsgErrorsAction()),
  setValidation: status => dispatch(loginSetValidationAction(status)),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Login);
